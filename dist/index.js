"use strict";
const DEFAULT_LIMIT = 50;
const buildPaginator = (params = {}) => {
    const parsePage = parseInt(params.page, 10) || 1;
    const parseLimit = parseInt(params.limit, 10) || DEFAULT_LIMIT;
    const maximumLimit = parseInt(params.maximumLimit, 10) || DEFAULT_LIMIT;
    const connectorUrl = (params.url && (params.url.includes('&') || (params.url.includes('?') && !params.url.includes('&'))) ? '&' : '?');
    const page = parsePage;
    const limit = parseLimit > maximumLimit ? maximumLimit : parseLimit;
    const skip = (page - 1) * limit;
    const paginate = (data, total) => {
        const totalPages = Math.ceil((total / limit));
        const countData = data.length;
        const result = { data, totalPages, total };
        if (countData < total && page < totalPages && params.url) {
            result.next = `${params.url}${connectorUrl}limit=${limit}&page=${page + 1}`;
        }
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
module.exports = buildPaginator;
//# sourceMappingURL=index.js.map