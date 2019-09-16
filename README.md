# Pagination-api

### Example with typeorm

```javascript

const Paginator = require('paginator-api');

const limit = 10;
const page = 1;
const paginate = new Paginator(page, limit);

const [data, count] = userRepository.findAndCount({ 
  where: { 
    firstName: "Timber", 
    lastName: "Saw" 
  },
  order: {
    name: "ASC",
    id: "DESC"
  },
  skip: paginate.skip,
  take: limit,
});


paginate.paginate(data, count, 'api/aaa')

```