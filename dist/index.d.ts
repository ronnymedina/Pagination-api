interface PaginationParams {
    page?: number | string;
    limit?: number | string;
    maximumLimit?: number | string;
    url?: string;
}
interface Paginate {
    data: Array<any>;
    total: number;
    totalPages: number;
    previous?: string;
    next?: string;
}
declare const buildPaginator: (params?: PaginationParams) => {
    page: number;
    limit: number;
    skip: number;
    paginate: (data: Array<any>, total: number) => Paginate;
};
export = buildPaginator;
