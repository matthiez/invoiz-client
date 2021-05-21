import {AbstractResource} from './AbstractResource';
import {
    Article,
    ArticlePaginationOptions,
    ArticleSetting,
    Endpoint,
    EntityArticle,
    PaginatedArticles,
    ResponseArticle
} from '../types';

export class ArticlesResource extends AbstractResource {
    add = async (data: Article): Promise<EntityArticle> => {
        return this.client.tryCatch({
            data,
            method: 'POST',
            url: Endpoint.Article,
        });
    };

    addSetting = async (data: ArticleSetting): Promise<ArticleSetting> =>
        this.client.tryCatch({
            data,
            method: 'POST',
            url: Endpoint.SettingArticle,
        });

    byId = async (id: number): Promise<ResponseArticle> =>
        this.client.getById<EntityArticle>(id, Endpoint.Article);

    paginated = async (params?: ArticlePaginationOptions): Promise<PaginatedArticles> =>
        this.client.paginated<EntityArticle>(Endpoint.Article, params);
}
