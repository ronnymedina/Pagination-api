interface PaginatedResult {
    totalPages: number;
    totalData: number;
    data: Array<any>;
    nextUrl?: string;
    previusUrl?: string;
}
declare class Paginator {
    page: number;
    limit: number;
    skip: number;
    constructor(page: string, limit: string, defaultLimit?: number);
    paginate(data: Array<any>, totalData: number, url: string): PaginatedResult;
}
export = Paginator;
