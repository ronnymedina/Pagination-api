# Pagination-api

You only need to pass the data and the total query

### Install

`npm i pagination-apis`

### Example with typeorm

```javascript

const Paginator = require('pagination-apis');

const limit = 10;
const page = 1;
const paginate = new Paginator(page, limit);

// query builder
const [data, total] = await getRepository(User)
  .createQueryBuilder('user')
  .where('user.name = :id', { id: 1 })
  .skip(paginate.skip)
  .take(limit)
  .getManyAndCount();


// or find
const [data, total] = await userRepository.findAndCount({ 
  order: { 
    columnName: 'ASC',
  }, 
  skip: paginate.skip,
  take: limit, 
});

const result = paginate.paginate(data, total, '/api/example');

/*
output result

{ 
  totalPages: 4,
  countTotalData: 40,
  data: [
    { id: 1, name: 'example' },
    { id: 1, name: 'example' },
    { id: 1, name: 'example' },
    { id: 1, name: 'example' },
    { id: 1, name: 'example' },
    { id: 1, name: 'example' },
    { id: 1, name: 'example' },
    { id: 1, name: 'example' },
    { id: 1, name: 'example' },
    { id: 1, name: 'example' },
  ],
  next: '/api/example?limit=10&page=3',
  previous: '/api/example?limit=10&page=1',
}
*/

```