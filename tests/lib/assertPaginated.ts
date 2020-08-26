import {BasePaginationOptions, PaginatedResponse} from '../../src/types';

export default <T>(paginated: PaginatedResponse<T>, opts: BasePaginationOptions, assert: (i: T, o: BasePaginationOptions) => void): void => {
    const items = paginated.data;

    expect(Array.isArray(items)).toBe(true);

    expect(items.length).toBeLessThanOrEqual(opts.limit || 20);

    expect(Number.isInteger(paginated.meta.count)).toBe(true);

    for (const item of paginated.data) {
        assert(item, opts);
    }
};