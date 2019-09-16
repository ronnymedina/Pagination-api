class Paginator {
  constructor(page, limit, defaultLimit = 10) {
    const parsePage = parseInt(page, 10);
    const parseLimit = parseInt(limit, 10);
    const pageVal = !parsePage ? 1 : parsePage;
    const limitVal = !parseLimit ? defaultLimit : parseLimit;

    this.page = pageVal;
    this.limit = limitVal;
  }

  get skip() {
    return (this.page > 0 ? this.page - 1 : this.page) * this.limit;
  }

  paginate(data, total, url) {
    const totalPages = Math.ceil((total / this.limit));
    const countData = data.length;
    const result = {
      totalPages,
      total,
      data,
    };

    // next page
    if (countData < total && this.page < totalPages) {
      result.nextUrl = `${url}?limit=${this.limit}&page=${this.page + 1}`;
    }

    // previus page
    if (this.page > 1 && countData) {
      result.previusUrl = `${url}?limit=${this.limit}&page=${this.page - 1}`;
    }

    return result;
  }
}

module.exports = Paginator;
