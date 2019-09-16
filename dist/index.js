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
    Paginator.prototype.paginate = function (data, totalData, url) {
        var totalPages = Math.ceil((totalData / this.limit));
        var countData = data.length;
        var result = {
            totalPages: totalPages,
            totalData: totalData,
            data: data,
        };
        // next page
        if (countData < totalData && this.page < totalPages) {
            result.nextUrl = url + "?limit=" + this.limit + "&page=" + (this.page + 1);
        }
        // previus page
        if (this.page > 1 && countData) {
            result.previusUrl = url + "?limit=" + this.limit + "&page=" + (this.page - 1);
        }
        return result;
    };
    return Paginator;
}());
module.exports = Paginator;
