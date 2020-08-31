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
    Miscellaneous,
    Offer,
    OfferPaginationOptions,
    PaginatedArticles,
    PaginatedCustomers,
    PaginatedEntityExpenses,
    PaginatedEntityInvoices,
    PaginatedOffers,
    PaginatedToDos,
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

export class InvoizClient extends AbstractClient {
    addInvoicePayment = async (id: number, data: InvoicePayment):
        Promise<EntityInvoicePayment> =>
        this.tryCatch({
            data,
            method: 'POST',
            url: `${Endpoint.Invoice}/${id}/payment`,
        });

    downloadInvoice = async (id: number): Promise<Buffer> =>
        this.tryCatch({
            method: 'GET',
            url: `${Endpoint.Invoice}/${id}/download`,
        });

    getArticle = async (id: number): Promise<ResponseArticle> =>
        this.getById<EntityArticle>(id, Endpoint.Article);

    getArticles = async (params?: ArticlePaginationOptions): Promise<PaginatedArticles> =>
        this.paginated<EntityArticle>(Endpoint.Article, params);

    getCustomer = async (id: number): Promise<ResponseCustomer> =>
        this.getById<Customer>(id, Endpoint.Customer);

    getCustomers = async (params?: CustomerPaginationOptions):
        Promise<PaginatedCustomers> =>
        this.paginated<Customer>(Endpoint.Customer, params);

    getExpense = async (id: number): Promise<ResponseExpense> =>
        this.getById<EntityExpense>(id, Endpoint.Expense);

    getExpenses = async (params?: ExpensePaginationOptions):
        Promise<PaginatedEntityExpenses> =>
        this.paginated<EntityExpense>(Endpoint.Expense, params);

    getInvoice = async (id: number): Promise<ResponseInvoice> =>
        this.getById<EntityInvoice>(id, Endpoint.Invoice);

    getInvoices = async (params?: InvoicePaginationOptions):
        Promise<PaginatedEntityInvoices> =>
        this.paginated<EntityInvoice>(Endpoint.Invoice, params);

    getOffer = async (id: number): Promise<ResponseOffer> =>
        this.getById<Offer>(id, Endpoint.Offer);

    getOffers = async (params?: OfferPaginationOptions): Promise<PaginatedOffers> =>
        this.paginated<Offer>(Endpoint.Offer, params);

    getPayConditions = async (): Promise<EntityPayCondition[]> =>
        this.tryCatch({
            method: 'GET',
            url: Endpoint.SettingPayCondition,
        });

    getMiscellaneousSettings = async (): Promise<Miscellaneous> =>
        this.tryCatch({
            method: 'GET',
            url: Endpoint.SettingMiscellaneous,
        });

    getToDos = async (params?: ToDoPaginationOptions): Promise<PaginatedToDos> =>
        this.paginated<EntityToDo>(Endpoint.ToDo, params);

    addArticle = async (data: Article): Promise<EntityArticle> => {
        return this.tryCatch({
            data,
            method: 'POST',
            url: Endpoint.Article,
        });
    };

    addArticleSetting = async (data: ArticleSetting): Promise<ArticleSetting> =>
        this.tryCatch({
            data,
            method: 'POST',
            url: Endpoint.SettingArticle,
        });

    addExpense = async (data: Expense): Promise<EntityExpense> =>
        this.tryCatch({
            data,
            method: 'POST',
            url: Endpoint.Expense,
        });

    addExpenseReceipt = async (filename: string, receipt: string):
        Promise<ExpenseReceipt[]> =>
        this.tryCatch({
            data: {
                filename, receipt,
            },
            headers: {
                'content-type': 'multipart/form-data',
            },
            method: 'POST',
            url: Endpoint.ExpenseReceipt,
        });

    lockAndFinalizeInvoice = async (id: number): Promise<void> =>
        this.tryCatch({
            method: 'PUT',
            url: `${Endpoint.Invoice}/${id}/lock`,
        });

    addPayCondition = async (data: PayCondition): Promise<EntityPayCondition> =>
        this.tryCatch({
            data,
            method: 'POST',
            url: Endpoint.SettingPayCondition,
        });

    addToDo = async (data: ToDo): Promise<EntityToDo> =>
        this.tryCatch({
            data,
            method: 'POST',
            url: Endpoint.ToDo,
        });

    addInvoice = async (data: Invoice): Promise<EntityInvoice> =>
        this.tryCatch({
            data,
            method: 'POST',
            url: `v2/${Endpoint.Invoice}`,
        });

    mailInvoice = async (id: number, data: InvoiceMailParams)
        : Promise<EntityInvoicePayment> =>
        this.tryCatch({
            data,
            method: 'POST',
            url: `${Endpoint.Invoice}/${id}/send`,
        });

    markToDoAsDone = async (id: number): Promise<EntityToDo> =>
        this.tryCatch({
            method: 'PUT',
            url: `${Endpoint.ToDo}/${id}/doneAt`,
        });

    removeExpenseReceipt = async (id: number): Promise<void> =>
        this.tryCatch({
            method: 'DELETE',
            url: `${Endpoint.ExpenseReceipt}/${id}`,
        });

    removeToDo = async (id: number): Promise<void> => this.tryCatch({
        method: 'DELETE',
        url: `${Endpoint.ToDo}/${id}`,
    });

    resetToDoDate = async (id: number, date: string): Promise<EntityToDo> =>
        this.tryCatch({
            data: {date},
            method: 'PUT',
            url: `${Endpoint.ToDo}/${id}/date`,
        });
}