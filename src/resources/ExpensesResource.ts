import {AbstractResource} from './AbstractResource';
import {
    Endpoint,
    EntityExpense,
    Expense,
    ExpensePaginationOptions,
    ExpenseReceipt,
    PaginatedEntityExpenses,
    ResponseExpense
} from '../types';

export class ExpensesResource extends AbstractResource {
    add = async (data: Expense): Promise<EntityExpense> =>
        this.client.tryCatch({
            data,
            method: 'POST',
            url: Endpoint.Expense,
        });

    addReceipt = async (filename: string, receipt: string):
        Promise<ExpenseReceipt[]> =>
        this.client.tryCatch({
            data: {
                filename, receipt,
            },
            headers: {
                'content-type': 'multipart/form-data',
            },
            method: 'POST',
            url: Endpoint.ExpenseReceipt,
        });

    byId = async (id: number): Promise<ResponseExpense> =>
        this.client.getById<EntityExpense>(id, Endpoint.Expense);

    deleteReceipt = async (id: number): Promise<void> =>
        this.client.tryCatch({
            method: 'DELETE',
            url: `${Endpoint.ExpenseReceipt}/${id}`,
        });

    paginated = async (params?: ExpensePaginationOptions):
        Promise<PaginatedEntityExpenses> =>
        this.client.paginated<EntityExpense>(Endpoint.Expense, params);
}
