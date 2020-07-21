interface PaginationParams {
  page?: number|string;
  limit?: number|string;
  maximumLimit?: number|string;
  url?: string;
}

interface Paginate {
  data: Array<any>;
  total: number;
  totalPages: number;
  previous?: string;
  next?: string;
}

/**
 * @constant
 * @type {number}
 * @default
 */
const DEFAULT_LIMIT = 50;

const buildPaginator = (params: PaginationParams = {}) => {
  // default values
  const parsePage = parseInt(<string>params.page, 10) || 1;
  const parseLimit = parseInt(<string>params.limit, 10) || DEFAULT_LIMIT;
  const maximumLimit = parseInt(<string>params.maximumLimit, 10) || DEFAULT_LIMIT;
  const connectorUrl = params.url && params.url.includes('&') ? '&' : '?';

  const page = parsePage;
  const limit = parseLimit > maximumLimit ? maximumLimit : parseLimit;
  const skip = (page - 1) * limit;

  const paginate = (data: Array<any>, total: number): Paginate => {
    const totalPages = Math.ceil((total / limit));
    const countData = data.length;
    const result: Paginate = { data, totalPages, total };

    // next page
    if (countData < total && page < totalPages && params.url) {
      result.next = `${params.url}${connectorUrl}limit=${limit}&page=${page + 1}`;
    }

    // previous page
    if (page > 1 && countData > 0 && params.url) {
      result.previous = `${params.url}${connectorUrl}limit=${limit}&page=${page - 1}`;
    }

    return result;
  };

  return {
    page,
    limit,
    skip,
    paginate,
  };
};

export default buildPaginator;
