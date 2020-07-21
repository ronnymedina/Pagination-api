"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = __importDefault(require("../lib"));
describe('Paginator', () => {
    it('should return attributes limit, page, skip, paginate', () => {
        const paginator = lib_1.default({ limit: 10, page: 10 });
        expect(paginator).toHaveProperty('page');
        expect(paginator).toHaveProperty('limit');
        expect(paginator).toHaveProperty('skip');
        expect(paginator).toHaveProperty('paginate');
    });
    it('should return page 1 and limit 50 if data is invalid or empty', () => {
        const emptyPaginator = lib_1.default();
        const invalidPaginator = lib_1.default({ limit: 'sss/', page: '-scs' });
        expect(emptyPaginator).toHaveProperty('page', 1);
        expect(emptyPaginator).toHaveProperty('limit', 50);
        expect(invalidPaginator).toHaveProperty('page', 1);
        expect(invalidPaginator).toHaveProperty('limit', 50);
    });
    it('limit should not be greater than the maximum limit', () => {
        const result1 = lib_1.default({ limit: 10000, page: '-scs' });
        const result2 = lib_1.default({ limit: 30, maximumLimit: 10, page: '-scs' });
        expect(result1).toHaveProperty('limit', 50);
        expect(result2).toHaveProperty('limit', 10);
    });
    it('skip should multiplied by limit and subtract 1 to page', () => {
        expect(lib_1.default({ limit: 10, page: 2 })).toHaveProperty('skip', 10);
        expect(lib_1.default({ limit: 10, page: 3 })).toHaveProperty('skip', 20);
        expect(lib_1.default({ limit: 10, page: 4 })).toHaveProperty('skip', 30);
        expect(lib_1.default({ limit: 5, page: 4 })).toHaveProperty('skip', 15);
        expect(lib_1.default({ limit: 50, page: 4 })).toHaveProperty('skip', 150);
    });
    describe('#paginate', () => {
        it('should have property totalPages, total, data', () => {
            const paginator = lib_1.default().paginate([], 10);
            expect(paginator).toHaveProperty('totalPages', 1);
            expect(paginator).toHaveProperty('total', 10);
            expect(paginator).toHaveProperty('data');
        });
        it('calculate total totalPages', () => {
            const r1 = lib_1.default().paginate([], 20);
            const r2 = lib_1.default({ page: 1, limit: 5 }).paginate([], 50);
            const r3 = lib_1.default({ page: 1, limit: 3 }).paginate([], 50);
            const r4 = lib_1.default({ page: 1, limit: 1 }).paginate([], 50);
            expect(r1).toHaveProperty('totalPages', 1);
            expect(r2).toHaveProperty('totalPages', 10);
            expect(r3).toHaveProperty('totalPages', 17);
            expect(r4).toHaveProperty('totalPages', 50);
        });
        it('should show propery next if data smaller than that total and url exists', () => {
            const result = lib_1.default({ url: '/url' }).paginate(new Array(10), 60);
            const result2 = lib_1.default({ url: '/url', limit: 10 }).paginate(new Array(10), 20);
            const result3 = lib_1.default({ url: '/url', limit: 10 }).paginate(new Array(10), 10);
            expect(result).toHaveProperty('next');
            expect(result2).toHaveProperty('next');
            expect(result3).not.toHaveProperty('next');
        });
        it('should show propery previous and next if page greater than one and url exists', () => {
            const result = lib_1.default({ url: '/api/example', page: 2, limit: 10 })
                .paginate(new Array(10), 40);
            expect(result).toHaveProperty('previous');
            expect(result).toHaveProperty('next');
        });
        it('should not show property next if it is the last page', () => {
            const paginate = lib_1.default({ url: '/api/example', page: 4, limit: 10 });
            const result = paginate.paginate(new Array(10), 40);
            expect(result).not.toHaveProperty('next');
        });
        it('next and previous should return url with params page and limit', () => {
            const result = lib_1.default({ url: '/api/example', page: 2, limit: 10 })
                .paginate(new Array(10), 40);
            const result2 = lib_1.default({ url: '/api/example?id=30&e=true', page: 2, limit: 10 })
                .paginate(new Array(10), 40);
            expect(result).toHaveProperty('next', '/api/example?limit=10&page=3');
            expect(result).toHaveProperty('previous', '/api/example?limit=10&page=1');
            expect(result2).toHaveProperty('next', '/api/example?id=30&e=true&limit=10&page=3');
            expect(result2).toHaveProperty('previous', '/api/example?id=30&e=true&limit=10&page=1');
        });
    });
});
