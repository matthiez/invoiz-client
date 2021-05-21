import {AbstractResource} from './AbstractResource';
import {Endpoint, Miscellaneous} from '../types';

export class SettingsResource extends AbstractResource {
    miscellaneous = async (): Promise<Miscellaneous> =>
        this.client.tryCatch({
            method: 'GET',
            url: Endpoint.SettingMiscellaneous,
        });
}
