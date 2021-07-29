### models의 index.js 초기 코드
```javascript
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};


const sequelize = new Sequelize(config.database, config.username, config.password, config);


db.sequelize = sequelize;


module.exports = db;
```

### app.js에서 sequelize 연동 코드 
```javascript
sequelize.sync({force : false})
.then(() => {
  console.log('데이터베이스 연결');
})
.catch((err) => {
  console.error(err);
});
```
