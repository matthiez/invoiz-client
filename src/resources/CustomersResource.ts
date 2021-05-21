import {AbstractResource} from './AbstractResource';
import {
    Customer,
    CustomerPaginationOptions,
    Endpoint,
    PaginatedCustomers,
    ResponseCustomer
} from '../types';

export class CustomersResource extends AbstractResource {
    byId = async (id: number): Promise<ResponseCustomer> =>
        this.client.getById<Customer>(id, Endpoint.Customer);

    paginated = async (params?: CustomerPaginationOptions):
        Promise<PaginatedCustomers> =>
        this.client.paginated<Customer>(Endpoint.Customer, params);
}
