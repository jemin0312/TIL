```javascript
npm i redis connect-redis

const RedisStore = require('connect-redis')(session)

const redisClient = redis.createClient({url : , password ; })

store : new RedisStore({client : redisClient})
```
