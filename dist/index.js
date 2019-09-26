'use strict';

class Paginator {
  constructor(page, limit, defaultLimit = 10) {
    const parsePage = parseInt(page, 10);
    const parseLimit = parseInt(limit, 10);
    this.page = !parsePage ? 1 : parsePage;
    this.limit = !parseLimit ? defaultLimit : parseLimit;
    this.skip = (this.page > 0 ? this.page - 1 : this.page) * this.limit;
  }

  paginate(data, countTotalData, url, connectorUrl = '?') {
    const totalPages = Math.ceil((countTotalData / this.limit));
    const countData = data.length;
    const result = {
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

module.exports = Paginator;
