# Pagination-api

You only need to pass the data and the total query

### Install

`npm i pagination-apis`

### import

```js
import buildPaginator from 'pagination-apis';

// or
const buildPaginator = require('pagination-apis');
```

### build paginator
All parameters are optional.
```ts
PaginationParams {
  page?: number|string;
  limit?: number|string;
  maximumLimit?: number|string;
  url?: string;
}

```
- If `page` is empty or invalid by default page is 1.
- If `limit` is empty or invalid by default page is 50.
- `maximumLimit` by default is 50.
- `url` If pass url it shows the next and previous properties.

```js
import buildPaginator from 'pagination-apis';

const { limit, page } = buildPaginator();

console.log(limit) // 50
console.log(page) // 1

// example 2
const { limit, page } = buildPaginator({ page: 2, limit: 30 });

console.log(limit) // 30
console.log(page) // 2
```

### Example with typeorm

```js
import buildPaginator from 'pagination-apis';

const { skip, limit, paginate } = buildPaginator({page: 1, limit: 10});

// query builder
const [data, total] = await getRepository(User)
  .createQueryBuilder('user')
  .where('user.name = :id', { id: 1 })
  .skip(skip)
  .take(limit)
  .getManyAndCount();


// or find
const [data, total] = await userRepository.findAndCount({ 
  order: { columnName: 'ASC' }, 
  skip,
  take: limit, 
});

return paginate(data, total, '/api/example');

// result 2
return paginate(data, total);

/*
output result

{ 
  totalPages: 4,
  total: 40,
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

output result 2

{ 
  totalPages: 4,
  total: 40,
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
}
*/