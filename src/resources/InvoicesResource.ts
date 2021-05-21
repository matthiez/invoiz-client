import {AbstractResource} from './AbstractResource';
import {
    Endpoint,
    EntityInvoice,
    EntityInvoicePayment,
    Invoice, InvoiceMailParams,
    InvoicePaginationOptions,
    InvoicePayment,
    PaginatedEntityInvoices,
    ResponseInvoice
} from '../types';

export class InvoicesResource extends AbstractResource {
    add = async (data: Invoice): Promise<EntityInvoice> =>
        this.client.tryCatch({
            data,
            method: 'POST',
            url: `v2/${Endpoint.Invoice}`,
        });

    addPaymentForId = async (id: number, data: InvoicePayment):
        Promise<EntityInvoicePayment> =>
        this.client.tryCatch({
            data,
            method: 'POST',
            url: `${Endpoint.Invoice}/${id}/payment`,
        });

    byId = async (id: number): Promise<ResponseInvoice> =>
        this.client.getById<EntityInvoice>(id, Endpoint.Invoice);

    downloadById = async (id: number): Promise<Buffer> =>
        this.client.tryCatch({
            method: 'GET',
            url: `${Endpoint.Invoice}/${id}/download`,
        });

    lockById = async (id: number): Promise<void> =>
        this.client.tryCatch({
            method: 'PUT',
            url: `${Endpoint.Invoice}/${id}/lock`,
        });

    paginated = async (params?: InvoicePaginationOptions):
        Promise<PaginatedEntityInvoices> =>
        this.client.paginated<EntityInvoice>(Endpoint.Invoice, params);

    sendById = async (id: number, data: InvoiceMailParams)
        : Promise<EntityInvoicePayment> =>
        this.client.tryCatch({
            data,
            method: 'POST',
            url: `${Endpoint.Invoice}/${id}/send`,
        });
}
