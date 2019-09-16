interface PaginatedResult {
  totalPages: number;

  totalData: number;

  data: Array<any>;

  nextUrl?: string;

  previusUrl?: string;
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

  public paginate(data: Array<any>, totalData: number, url: string): PaginatedResult {
    const totalPages: number = Math.ceil((totalData / this.limit));
    const countData: number = data.length;

    const result: PaginatedResult = {
      totalPages,
      totalData,
      data,
    };

    // next page
    if (countData < totalData && this.page < totalPages) {
      result.nextUrl = `${url}?limit=${this.limit}&page=${this.page + 1}`;
    }

    // previus page
    if (this.page > 1 && countData) {
      result.previusUrl = `${url}?limit=${this.limit}&page=${this.page - 1}`;
    }

    return result;
  }
}

export = Paginator;
