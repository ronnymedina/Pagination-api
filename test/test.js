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
    it('should has property totalPages, totalData, data', () => {
      const paginator = new Paginator(1, 10);
      const result = paginator.paginate(new Array(10).fill(true), 10, 'api/example');

      expect(result).to.have.property('totalPages', 1);
      expect(result).to.have.property('totalData', 10);
      expect(result).to.have.property('data');
    });

    it('totalPages should ber grater than 1 if totalData is grater than data', () => {
      const p1 = new Paginator(1, 10);
      const result = p1.paginate(new Array(10).fill(true), 20, 'api/example');

      expect(result).to.have.property('totalPages', 2);
    });
  });
});
