import {AbstractResource} from './AbstractResource';
import {Endpoint, EntityPayCondition, PayCondition} from '../types';

export class PayConditionsResource extends AbstractResource {
    add = async (data: PayCondition): Promise<EntityPayCondition> =>
        this.client.tryCatch({
            data,
            method: 'POST',
            url: Endpoint.SettingPayCondition,
        });

    all = async (): Promise<EntityPayCondition[]> =>
        this.client.tryCatch({
            method: 'GET',
            url: Endpoint.SettingPayCondition,
        });
}
