import Axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {
    ApiResponse,
    AuthTokenResponse,
    BasePaginationOptions, ClientConfig,
    Endpoint,
    PaginatedResponse,
} from './types';

export abstract class AbstractClient {
    protected readonly apiKey: string
    protected readonly apiKeySecret: string
    protected readonly installationId?: string
    protected accessToken?: string

    protected instance: AxiosInstance = Axios.create({
        baseURL: 'https://app.invoiz.de/api/',
    });

    public constructor(cfg: ClientConfig) {
        this.accessToken = cfg.accessToken;
        this.apiKey = cfg.apiKey;
        this.apiKeySecret = cfg.apiKeySecret;
        this.installationId = cfg.installationId;

        if (this.accessToken) {
            this.setAccessToken(this.accessToken);
        }

        this.instance.interceptors.request.use(async cfg => {
            if (!cfg.headers.Authorization && !cfg.auth) {
                const token = (await this.authToken()).token;

                this.setAccessToken(token);

                cfg.headers.Authorization = this.getAccessToken();
            }

            return cfg;
        }, err => Promise.reject(err));
    }

    async authToken(installationId: ClientConfig['installationId'] = this.installationId):
        Promise<AuthTokenResponse> {
        return this.tryCatch<AuthTokenResponse>({
            auth: {
                password: this.apiKeySecret,
                username: this.apiKey,
            },
            data: {installationId},
            method: 'POST',
            url: Endpoint.AuthToken,
        });
    };

    getAccessToken(strip: boolean = false): string | undefined {
        const accessToken = this.instance.defaults.headers.Authorization;

        if (accessToken && strip) {
            return accessToken.replace('Bearer ', '');
        }

        return accessToken;
    }

    setAccessToken(accessToken?: string): void {
        if (accessToken) {
            accessToken =
                accessToken.startsWith('Bearer ') ? accessToken : `Bearer ${accessToken}`;

            this.instance.defaults.headers.Authorization = accessToken;
        } else {
            delete this.instance.defaults.headers.Authorization;
        }
    }

    protected async getById<T>(id: number, endpoint: Endpoint): Promise<ApiResponse<T>> {
        return this.retry({
            method: 'GET',
            url: `${endpoint}/${id}`,
        });
    }

    protected async paginated<T>(endpoint: string, params?: BasePaginationOptions)
        : Promise<PaginatedResponse<T>> {
        return this.retry({
            method: 'GET',
            params,
            url: endpoint,
        });
    }

    protected async retry<T = {}>(cfg: AxiosRequestConfig): Promise<T> {
        try {
            return await this.tryCatch(cfg);
        } catch (err) {
            if (401 === err.response.status) {
                this.setAccessToken();

                try {
                    return await this.tryCatch(cfg);
                } catch (err) {
                    throw err;
                }
            }

            throw err;
        }
    }

    protected async tryCatch<T = {}>(cfg: AxiosRequestConfig): Promise<T> {
        const getData = async () => (await this.instance.request(cfg)).data;

        try {
            return await getData();
        } catch (err) {
            throw err;
        }
    }
}
