import {AbstractResource} from './AbstractResource';
import {
    Endpoint,
    Offer,
    OfferPaginationOptions,
    PaginatedOffers,
    ResponseOffer
} from '../types';

export class OffersResource extends AbstractResource {
    byId = async (id: number): Promise<ResponseOffer> =>
        this.client.getById<Offer>(id, Endpoint.Offer);

    paginated = async (params?: OfferPaginationOptions): Promise<PaginatedOffers> =>
        this.client.paginated<Offer>(Endpoint.Offer, params);
}
