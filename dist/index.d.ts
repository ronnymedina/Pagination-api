interface PaginatedResult {
    totalPages: number;
    countTotalData: number;
    data: Array<any>;
    next?: string;
    previous?: string;
}
declare class Paginator {
    page: number;
    limit: number;
    skip: number;
    constructor(page: string, limit: string, defaultLimit?: number);
    paginate(data: Array<any>, countTotalData: number, url: string): PaginatedResult;
}
export = Paginator;
