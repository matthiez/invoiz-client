import Axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {
    ApiResponse,
    AuthTokenResponse,
    BasePaginationOptions,
    Endpoint,
    PaginatedResponse,
} from './types';

export abstract class AbstractClient {
    protected instance: AxiosInstance = Axios.create({
        baseURL: 'https://app.invoiz.de/api/',
    });
    protected accessToken?: string;

    public constructor(
        protected apiKey: string,
        protected apiKeySecret: string,
        protected installationId: string,
        accessToken?: string) {
        if (accessToken) {
            this.setAccessToken(accessToken);
        }
    }

    async authToken():
        Promise<AuthTokenResponse> {
        const response = await this.tryCatch<AuthTokenResponse>({
            auth: {
                password: this.apiKeySecret,
                username: this.apiKey,
            },
            data: {installationId: this.installationId},
            method: 'POST',
            url: Endpoint.AuthToken,
        }, false);

        this.setAccessToken(response.token);

        return response;
    };

    getAccessToken(): string | undefined {
        return this.accessToken;
    }

    setAccessToken(accessToken: string): void {
        this.accessToken =
            accessToken.startsWith('Bearer ') ? accessToken : `Bearer ${accessToken}`;
    }

    protected async axios(): Promise<AxiosInstance> {
        if (!this.getAccessToken()) {
            await this.authToken();
        }

        this.instance.defaults.headers.Authorization = this.accessToken;

        return this.instance;
    }

    protected async getById<T>(id: number, endpoint: Endpoint): Promise<ApiResponse<T>> {
        return this.tryCatch({
            method: 'GET',
            url: `${endpoint}/${id}`,
        });
    }

    protected async paginated<T>(endpoint: string, params?: BasePaginationOptions)
        : Promise<PaginatedResponse<T>> {
        return this.tryCatch({
            method: 'GET',
            params,
            url: endpoint,
        });
    }

    protected async tryCatch<T = {}>(cfg: AxiosRequestConfig, retry: boolean = true): Promise<T> {
        try {
            const axios = await this.axios();
            const response = await axios.request(cfg);

            return response.data;
        } catch (err) {
            if (retry && 401 === err.response.status) {
                await this.authToken();

                return await this.tryCatch<T>(cfg, false);
            }

            throw err;
        }
    }
}