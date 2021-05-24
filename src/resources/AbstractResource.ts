import {InvoizClient} from '../InvoizClient';

export abstract class AbstractResource {
    constructor(protected client: InvoizClient) {
    }
}
