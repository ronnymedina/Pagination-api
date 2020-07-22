# Pagination-api

You only need to pass the data and the total query

### Install

`npm i pagination-apis`

### import

```js
import * as buildPaginator from 'pagination-apis';

// or
const buildPaginator = require('pagination-apis');
```

**build paginator**

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
- If `limit` is empty or invalid by default page is 50. The `limit` is always less than `maximumLimit`.
- `maximumLimit` by default is 50. always try to pass a safe value and avoid making a big query.
- `url` If pass url it shows the next and previous properties.
```js
import * as buildPaginator from 'pagination-apis';

const { limit, page } = buildPaginator();

console.log(limit) // 50
console.log(page) // 1

// example 2
const { limit, page } = buildPaginator({ page: 2, limit: 30, maximumLimit: 100 });

console.log(limit) // 30
console.log(page) // 2

// example url without params
const { paginate } = buildPaginator({ url: '/api/example' });

console.log(paginate([], 150));
/*
{ 
  totalPages: 2,
  total: 100,
  data: [],
  next: '/api/example?limit=50&page=2',
  previous: '/api/example?limit=50&page=1',
}
*/

// example url with params
const { paginate } = buildPaginator({ url: '/api/example?id=30' });

console.log(paginate([], 150));
/*
{ 
  totalPages: 2,
  total: 100,
  data: [],
  next: '/api/example?id=30&limit=50&page=2',
  previous: '/api/example?id=30&limit=50&page=1',
}
*/

const { paginate } = buildPaginator({ url: '/api/example?id=30&q=hola' });

console.log(paginate([], 150));
/*
{ 
  totalPages: 2,
  total: 100,
  data: [],
  next: '/api/example?id=30&q=hola&limit=50&page=2',
  previous: '/api/example?id=30&q=hola&limit=50&page=1',
}
*/

```

### Example with typeorm

```js
import * as buildPaginator from 'pagination-apis';

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
```

### Example with sequelize
```ts
const { page, limit, skip, paginate } = buildPaginator({limit: 10, page: 1});

const {count, rows} = await model.findAndCountAll({
  limit,
  offset: skip,
  where: {userId},
});

return paginate(rows, count);
```

### Example output
```
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
```

### Example with sequelize and typescript in base service

```ts
export interface FilterWithPagination {
  data: Array<any>;
  total: number;
  totalPages: number;
  next?: string;
  previous?: string;
}
const MAXIMUM_LIMIT_BY_PAGE = 50;

class BaseService {
  /**
   * @param {WhereOptions} whereOption
   * @returns {Promise<FilterWithPagination>}
   */
  async filterWithPagination(
    whereOptions: WhereOptions,
    params: PaginationParams,
    relations: any = [],
  ): Promise<FilterWithPagination> {
    const {
      limit, skip, paginate,
    } = buildPaginator({...params, maximumLimit: MAXIMUM_LIMIT_BY_PAGE});

    const {count, rows} = await this.model.findAndCountAll({
      limit,
      offset: skip,
      where: whereOptions,
      include: relations,
    });

    return paginate(rows, count);
  }
}
```
