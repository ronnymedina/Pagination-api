'use strict';

const expect = require('chai').expect;
const Paginator = require('../dist/index.js');

describe('Paginator', () => {
  it('should return attributes limit, page, skip', () => {
    const paginator = new Paginator(1, 10);

    expect(paginator).to.have.property('page', 1);
    expect(paginator).to.have.property('limit', 10);
    expect(paginator).to.have.property('skip', 0);
  });

  it('skip should ber equal to 0 if page is 1 or 0', () => {
    expect(new Paginator(1, 10)).to.have.property('skip', 0);
    expect(new Paginator(0, 10)).to.have.property('skip', 0);
  });

  it('skip should ber equal to 1 if page is 1', () => {
    expect(new Paginator(0, 10)).to.have.property('skip', 0);
  });

  it('skip should multiplied by limit if page is greater than 2 and subtract 1 to page', () => {
    expect(new Paginator(2, 10)).to.have.property('skip', 10);
    expect(new Paginator(3, 10)).to.have.property('skip', 20);
    expect(new Paginator(4, 10)).to.have.property('skip', 30);
    expect(new Paginator(4, 5)).to.have.property('skip', 15);
    expect(new Paginator(4, 50)).to.have.property('skip', 150);
  });

  describe('#paginate', () => {
    it('should has property totalPages, countTotalData, data', () => {
      const paginator = new Paginator(1, 10);
      const result = paginator.paginate(new Array(10).fill(true), 10, 'api/example');

      expect(result).to.have.property('totalPages', 1);
      expect(result).to.have.property('countTotalData', 10);
      expect(result).to.have.property('data');
    });

    it('calculate total totalPages', () => {
      const r1 = new Paginator(1, 10).paginate([], 20, '/api/example');
      const r2 = new Paginator(1, 5).paginate([], 50, '/api/example');
      const r3 = new Paginator(1, 3).paginate([], 50, '/api/example');
      const r4 = new Paginator(1, 1).paginate([], 50, '/api/example');

      expect(r1).to.have.property('totalPages', 2);
      expect(r2).to.have.property('totalPages', 10);
      expect(r3).to.have.property('totalPages', 17);
      expect(r4).to.have.property('totalPages', 50);
    });

    it('should show propery next if data smaller than that countTotalData', () => {
      const paginate = new Paginator(1, 10);
      const result = paginate.paginate(new Array(10).fill(false), 40, '/api/example');

      expect(result).to.have.property('next');
    });

    it('should show propery previous and next if page greater than one', () => {
      const paginate = new Paginator(2, 10);
      const result = paginate.paginate(new Array(10).fill({ id: 1, name: 'example' }), 40, '/api/example');

      expect(result).to.have.property('previous', '/api/example?limit=10&page=1');
      expect(result).to.have.property('next', '/api/example?limit=10&page=3');
    });

    it('should not show property next if it is the last page', () => {
      const paginate = new Paginator(4, 10);
      const result = paginate.paginate(new Array(10).fill(false), 40, '/api/example');

      expect(result).to.not.have.property('next');
    });
  });
});
