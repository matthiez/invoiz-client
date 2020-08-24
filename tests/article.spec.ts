import {ArticlePaginationOptions, EntityArticle, PaginatedArticles,} from '../src';
import assertPaginated from './lib/assertPaginated';
import client from './lib/client';

const prepareAssertion = (entity: EntityArticle, opts: ArticlePaginationOptions): EntityArticle => ({
    id: expect.any(Number),
    number: expect.any(String),
    price: expect.any(Number),
    priceGross: expect.any(Number),
    title: opts.searchText
        ? expect.stringContaining(opts.searchText) : expect.any(String),
    vatPercent: expect.nilOrAny(Number),
});

const assertArticle = (a: EntityArticle, o: ArticlePaginationOptions) =>
    expect(a).toMatchObject<EntityArticle>(prepareAssertion(a, o));

const assertArticleInDepth = (a: EntityArticle, o: ArticlePaginationOptions) => {
    const article: EntityArticle = prepareAssertion(a, o);
    article.calculationBase = expect.stringMatching(/^gross|net/);
    article.category = expect.any(String);
    article.description = expect.any(String);
    article.notes = expect.any(String);
    article.notesAlert = expect.any(Boolean);
    article.unit = expect.any(String);

    expect(a).toMatchObject<EntityArticle>(article);
};

const assertArticles = async (opts: ArticlePaginationOptions): Promise<PaginatedArticles> => {
    const articles = await client.getArticles(opts);

    assertPaginated<EntityArticle>(articles, opts, assertArticle);

    return articles;
};

describe('Article related', () => {
    let id: number;

    test('should return paginated with n articles', async () => await assertArticles({
        desc: true,
        limit: 20,
        offset: 0,
        orderBy: 'number',
        searchText: undefined,
    }));

    test('should return paginated with 1 article', async () => {
        const articles = await assertArticles({
            desc: false,
            limit: 1,
            offset: 0,
            orderBy: 'title',
            searchText: 'Testartikel',
        });

        id = articles.data[0].id;
    });

    test('should return 1 article', async () => {
        const response = await client.getArticle(id);

        assertArticleInDepth(response.data, {});
    });
});