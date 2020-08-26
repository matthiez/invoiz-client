import {
    Article,
    ArticlePaginationOptions,
    ArticleSetting,
    AuthTokenResponse,
    Customer,
    CustomerPaginationOptions,
    Endpoint,
    EntityArticle,
    EntityExpense,
    EntityInvoice,
    EntityInvoicePayment,
    EntityPayCondition,
    EntityToDo,
    Expense,
    ExpensePaginationOptions,
    ExpenseReceipt,
    Invoice,
    InvoiceMailParams,
    InvoicePaginationOptions,
    InvoicePayment,
    Micellaneous,
    Offer,
    OfferPaginationOptions,
    PaginatedArticles,
    PaginatedCustomers,
    PaginatedEntityExpenses,
    PaginatedEntityInvoices,
    PaginatedOffers, PaginatedToDos,
    PayCondition,
    ResponseArticle,
    ResponseCustomer,
    ResponseExpense,
    ResponseInvoice,
    ResponseOffer,
    ToDo,
    ToDoPaginationOptions
} from './types';
import {AbstractClient} from './AbstractClient';

export default class InvoizClient extends AbstractClient {
    constructor(apiKey: string, apiKeySecret: string) {
        super(apiKey, apiKeySecret);
    }

    async addInvoicePayment(id: number, data: InvoicePayment): Promise<EntityInvoicePayment> {
        return this.tryCatch({
            data,
            method: 'POST',
            url: `${Endpoint.Invoice}/${id}/payment`,
        });
    }

    async authToken(installationId: string): Promise<AuthTokenResponse> {
        const response = await this.tryCatch<AuthTokenResponse>({
            data: {installationId},
            method: 'POST',
            url: Endpoint.AuthToken,
        });

        this.accessToken = response.token;

        return response;
    }

    async downloadInvoice(id: number): Promise<Blob | null> {
        return this.tryCatch({
            method: 'GET',
            url: `${Endpoint.Invoice}/${id}/download`,
        });
    }

    async getArticle(id: number): Promise<ResponseArticle> {
        return this.getById<EntityArticle>(id, Endpoint.Article);
    }

    async getArticles(params?: ArticlePaginationOptions): Promise<PaginatedArticles> {
        return this.paginated<EntityArticle>(Endpoint.Article, params);
    }

    async getCustomer(id: number): Promise<ResponseCustomer> {
        return this.getById<Customer>(id, Endpoint.Customer);
    }

    async getCustomers(params?: CustomerPaginationOptions): Promise<PaginatedCustomers> {
        return this.paginated<Customer>(Endpoint.Customer, params);
    }

    async getExpense(id: number): Promise<ResponseExpense> {
        return this.getById<EntityExpense>(id, Endpoint.Expense);
    }

    async getExpenses(params?: ExpensePaginationOptions): Promise<PaginatedEntityExpenses> {
        return this.paginated<EntityExpense>(Endpoint.Expense, params);
    }

    async getInvoice(id: number): Promise<ResponseInvoice> {
        return this.getById<EntityInvoice>(id, Endpoint.Invoice);
    }

    async getInvoices(params?: InvoicePaginationOptions): Promise<PaginatedEntityInvoices> {
        return this.paginated<EntityInvoice>(Endpoint.Invoice, params);
    }

    async getOffer(id: number): Promise<ResponseOffer> {
        return this.getById<Offer>(id, Endpoint.Offer);
    }

    async getOffers(params?: OfferPaginationOptions): Promise<PaginatedOffers> {
        return this.paginated<Offer>(Endpoint.Offer, params);
    }

    async getPayConditions(): Promise<EntityPayCondition[] | null> {
        return this.tryCatch({
            method: 'GET',
            url: Endpoint.SettingPayCondition,
        });
    }

    async getMiscellaneousSettings(): Promise<Micellaneous | null> {
        return this.tryCatch({
            method: 'GET',
            url: Endpoint.SettingMiscellaneous,
        });
    }

    async getToDos(params?: ToDoPaginationOptions): Promise<PaginatedToDos> {
        return this.paginated<EntityToDo>(Endpoint.ToDo, params);
    }

    async addArticle(data: Article): Promise<EntityArticle | null> {
        return this.tryCatch({
            data,
            method: 'POST',
            url: Endpoint.Article,
        });
    }

    async addArticleSetting(data: ArticleSetting): Promise<ArticleSetting | null> {
        return this.tryCatch({
            data,
            method: 'POST',
            url: Endpoint.SettingArticle,
        });
    }

    async addExpense(data: Expense): Promise<EntityExpense | null> {
        return this.tryCatch({
            data,
            method: 'POST',
            url: Endpoint.Expense,
        });
    }

    async addExpenseReceipt(filename: string, receipt: string): Promise<ExpenseReceipt[] | null> {
        return this.tryCatch({
            data: {
                filename, receipt,
            },
            headers: {
                'content-type': 'multipart/form-data',
            },
            method: 'POST',
            url: Endpoint.ExpenseReceipt,
        });
    }

    async addInvoice(id: number): Promise<void | null> {
        return this.tryCatch({
            method: 'PUT',
            url: `${Endpoint.Invoice}/${id}/lock`,
        });
    }

    async addPayCondition(data: PayCondition): Promise<EntityPayCondition | null> {
        return this.tryCatch({
            data,
            method: 'POST',
            url: Endpoint.SettingPayCondition,
        });
    }

    async addToDo(data: ToDo): Promise<EntityToDo | null> {
        return this.tryCatch({
            data,
            method: 'POST',
            url: Endpoint.ToDo,
        });
    }

    async lockAndFinalizeInvoice(data: Invoice): Promise<EntityInvoice | null> {
        return this.tryCatch({
            data,
            method: 'POST',
            url: `v2/${Endpoint.Invoice}`,
        });
    }

    async mailInvoice(id: number, data: InvoiceMailParams): Promise<EntityInvoicePayment | null> {
        return this.tryCatch({
            data,
            method: 'POST',
            url: `${Endpoint.Invoice}/${id}/send`,
        });
    }

    async markToDoAsDone(id: number): Promise<EntityToDo | null> {
        return this.tryCatch({
            method: 'PUT',
            url: `${Endpoint.ToDo}/${id}/doneAt`,
        });
    }

    async removeExpenseReceipt(id: number): Promise<void | null> {
        return this.tryCatch({
            method: 'DELETE',
            url: `${Endpoint.ExpenseReceipt}/${id}`,
        });
    }

    async removeToDo(id: number): Promise<void | null> {
        return this.tryCatch({
            method: 'DELETE',
            url: `${Endpoint.ToDo}/${id}`,
        });
    }

    async resetToDoDate(id: number, date: string): Promise<EntityToDo | null> {
        return this.tryCatch({
            data: {date},
            method: 'PUT',
            url: `${Endpoint.ToDo}/${id}/date`,
        });
    }
}