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
### 모델 생성 
```javascript
const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
  static init(sequelize)
  {
    return super.init({
      name : {
        type : Sequelize.STRING(20),
        allowNull : false,
        unique : true,
      },
      age : {
        type : Sequelize.INTEGER.UNSIGNED,
        allowNull : false,
      },
      married : {
        type : Sequelize.BOOLEAN,
        allowNull : true,
      },
      comment : {
        type : Sequelize.TEXT,
        allowNull : true
      },
      created_at : {
        type : Sequelize.DATE,
        allowNull : false,
        defaultValue : Sequelize.NOW,
      }
    },  // 여기까지는 column 정의
    { // model에 대한 설정
      sequelize,
      timestamps : false,
      underscored : false,
      modelName : 'User',
      tableName : 'users',
      paranoid : false,
      charset : 'utf8',
      collate : 'utf8_general_ci'

    }
    
    );
  }
}
```
