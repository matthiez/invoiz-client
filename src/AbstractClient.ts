import Axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {ApiResponse, BasePaginationOptions, Endpoint, PaginatedResponse,} from './types';

export class AbstractClient {
    protected accessToken?: string;

    protected instance: AxiosInstance = Axios.create({
        baseURL: 'https://app.invoiz.de/api/',
    });

    constructor(protected apiKey: string, protected apiKeySecret: string) {
    }

    protected get axios(): AxiosInstance {
        if (this.accessToken) {
            this.instance.defaults.headers.Authorization = `Bearer ${this.accessToken}`;
        } else {
            delete this.instance.defaults.headers.Authorization;

            this.instance.defaults.auth = {
                password: this.apiKeySecret,
                username: this.apiKey,
            };
        }

        return this.instance;
    }

    setAccessToken(accessToken: string): void {
        this.accessToken = accessToken;
    }

    protected async getById<T>(id: number, endpoint: Endpoint): Promise<ApiResponse<T>> {
        return this.tryCatch({
            method: 'GET',
            url: `${endpoint}/${id}`,
        });
    }

    protected async paginated<T>(endpoint: string, params?: BasePaginationOptions): Promise<PaginatedResponse<T>> {
        try {
            const response = await this.axios.get(endpoint, {
                params,
            });

            return response.data;
        } catch (err) {
            throw err;
        }
    }

    protected async tryCatch<T = {}>(cfg: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.axios.request(cfg);

            return response.data;
        } catch (err) {
            throw err;
        }
    }
}