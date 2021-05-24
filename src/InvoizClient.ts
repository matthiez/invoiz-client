import Axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {
    ApiResponse,
    AuthTokenResponse,
    BasePaginationOptions,
    ClientConfig,
    Endpoint,
    PaginatedResponse,
} from './types';
import {ArticlesResource} from './resources/ArticlesResource';
import {CustomersResource} from './resources/CustomersResource';
import {ExpensesResource} from './resources/ExpensesResource';
import {InvoicesResource} from './resources/InvoicesResource';
import {OffersResource} from './resources/OffersResource';
import {PayConditionsResource} from './resources/PayConditionsResource';
import {SettingsResource} from './resources/SettingsResource';
import {TodosResource} from './resources/TodosResource';

export class InvoizClient {
    public readonly ApiVersion = '0.0.2';

    public articles: ArticlesResource;
    public customers: CustomersResource;
    public expenses: ExpensesResource;
    public invoices: InvoicesResource;
    public offers: OffersResource;
    public payConditions: PayConditionsResource;
    public settings: SettingsResource;
    public todos: TodosResource;

    protected instance: AxiosInstance = Axios.create({
        baseURL: 'https://app.invoiz.de/api/',
    });

    public constructor(protected readonly cfg: ClientConfig) {
        this.articles = new ArticlesResource(this);
        this.customers = new CustomersResource(this);
        this.expenses = new ExpensesResource(this);
        this.invoices = new InvoicesResource(this);
        this.offers = new OffersResource(this);
        this.payConditions = new PayConditionsResource(this);
        this.settings = new SettingsResource(this);
        this.todos = new TodosResource(this);

        if (this.cfg.accessToken) this.setAccessToken(this.cfg.accessToken);

        this.instance.interceptors.request.use(async cfg => {
            if (!cfg.headers.Authorization && !cfg.auth) {
                const token = (await this.authToken()).token;

                this.setAccessToken(token);

                cfg.headers.Authorization = this.getAccessToken();
            }

            return cfg;
        }, Promise.reject);
    }

    async authToken(
        installationId: ClientConfig['installationId'] = this.cfg.installationId):
        Promise<AuthTokenResponse> {
        return this.tryCatch<AuthTokenResponse>({
            auth: {
                password: this.cfg.apiKeySecret,
                username: this.cfg.apiKey,
            },
            data: {installationId},
            method: 'POST',
            url: Endpoint.AuthToken,
        });
    };

    getAccessToken(strip: boolean = false): string | undefined {
        const accessToken = this.instance.defaults.headers.Authorization;

        if (accessToken && strip) return accessToken.replace('Bearer ', '');

        return accessToken;
    }

    setAccessToken(accessToken?: string): void {
        if (accessToken) {
            accessToken =
                accessToken.startsWith('Bearer ') ? accessToken : `Bearer ${accessToken}`;

            this.instance.defaults.headers.Authorization = accessToken;
        } else delete this.instance.defaults.headers.Authorization;
    }

    async getById<T>(id: number, endpoint: Endpoint): Promise<ApiResponse<T>> {
        return this.retry<ApiResponse<T>>({
            method: 'GET',
            url: `${endpoint}/${id}`,
        });
    }

    async paginated<T>(endpoint: string, params?: BasePaginationOptions)
        : Promise<PaginatedResponse<T>> {
        return this.retry({
            method: 'GET',
            params,
            url: endpoint,
        });
    }

    async tryCatch<T extends {}>(cfg: AxiosRequestConfig): Promise<T> {
        const getData = async () => (await this.instance.request(cfg)).data;

        try {
            return await getData();
        } catch (e) {
            throw e;
        }
    }

    private async retry<T extends {}>(cfg: AxiosRequestConfig): Promise<T> {
        try {
            return await this.tryCatch(cfg);
        } catch (e) {
            if (401 === e.response.status) {
                this.setAccessToken();

                try {
                    return await this.tryCatch(cfg);
                } catch (e) {
                    throw e;
                }
            }

            throw e;
        }
    }
}
