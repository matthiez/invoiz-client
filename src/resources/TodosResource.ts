import {AbstractResource} from './AbstractResource';
import {
    Endpoint,
    EntityToDo,
    PaginatedToDos,
    ToDo,
    ToDoPaginationOptions
} from '../types';

export class TodosResource extends AbstractResource {
    add = async (data: ToDo): Promise<EntityToDo> =>
        this.client.tryCatch({
            data,
            method: 'POST',
            url: Endpoint.ToDo,
        });

    delete = async (id: number): Promise<void> => this.client.tryCatch<void>({
        method: 'DELETE',
        url: `${Endpoint.ToDo}/${id}`,
    });

    markAsDoneAt = async (id: number): Promise<EntityToDo> =>
        this.client.tryCatch({
            method: 'PUT',
            url: `${Endpoint.ToDo}/${id}/doneAt`,
        });

    paginated = async (params?: ToDoPaginationOptions): Promise<PaginatedToDos> =>
        this.client.paginated<EntityToDo>(Endpoint.ToDo, params);

    resetDate = async (id: number, date: string): Promise<EntityToDo> =>
        this.client.tryCatch({
            data: {date},
            method: 'PUT',
            url: `${Endpoint.ToDo}/${id}/date`,
        });
}
