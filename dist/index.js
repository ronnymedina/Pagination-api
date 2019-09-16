"use strict";
var Paginator = /** @class */ (function () {
    function Paginator(page, limit, defaultLimit) {
        if (defaultLimit === void 0) { defaultLimit = 10; }
        var parsePage = parseInt(page, 10);
        var parseLimit = parseInt(limit, 10);
        this.page = !parsePage ? 1 : parsePage;
        this.limit = !parseLimit ? defaultLimit : parseLimit;
        this.skip = (this.page > 0 ? this.page - 1 : this.page) * this.limit;
    }
    Paginator.prototype.paginate = function (data, countTotalData, url) {
        var totalPages = Math.ceil((countTotalData / this.limit));
        var countData = data.length;
        var result = {
            totalPages: totalPages,
            countTotalData: countTotalData,
            data: data,
        };
        // next page
        if (countData < countTotalData && this.page < totalPages) {
            result.next = url + "?limit=" + this.limit + "&page=" + (this.page + 1);
        }
        // previous page
        if (this.page > 1 && countData) {
            result.previous = url + "?limit=" + this.limit + "&page=" + (this.page - 1);
        }
        return result;
    };
    return Paginator;
}());
module.exports = Paginator;
