interface PaginatedResult {
  totalPages: number;

  countTotalData: number;

  data: Array<any>;

  next?: string;

  previous?: string;
}

class Paginator {
  public page: number;

  public limit: number;

  public skip: number;

  public constructor(page: string, limit: string, defaultLimit = 10) {
    const parsePage: number = parseInt(page, 10);
    const parseLimit: number = parseInt(limit, 10);

    this.page = !parsePage ? 1 : parsePage;
    this.limit = !parseLimit ? defaultLimit : parseLimit;
    this.skip = (this.page > 0 ? this.page - 1 : this.page) * this.limit;
  }

  public paginate(
    data: Array<any>,
    countTotalData: number,
    url: string,
    connectorUrl: string = '?',
  ): PaginatedResult {
    const totalPages: number = Math.ceil((countTotalData / this.limit));
    const countData: number = data.length;

    const result: PaginatedResult = {
      totalPages,
      countTotalData,
      data,
    };

    // next page
    if (countData < countTotalData && this.page < totalPages) {
      result.next = `${url}${connectorUrl}limit=${this.limit}&page=${this.page + 1}`;
    }

    // previous page
    if (this.page > 1 && countData) {
      result.previous = `${url}${connectorUrl}limit=${this.limit}&page=${this.page - 1}`;
    }

    return result;
  }
}

export = Paginator;
