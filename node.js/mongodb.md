### 몽고DB 초기 세팅 과정 
- C://program Files/mongodb/server/5.0/bin/mongod.exe 실행 
- C://program Files/mongodb/server/5.0/bin/mongo.exe 실행

중요! mongod를 실행시켜놓은 상태에서 mongo를 실행해야 한다. 
```shell
use admin // mongo.exe
```
```shell
db.createUser({user : 'root', pwd : '원하는 비밀번호,', roles : ['root']});
// 관리자 계정을 생성해준다
```
mongod와 mongo를 꺼준뒤,
```shell
mongod --auth // 실행해주기 
```
```shell
mongo -u root -p 내가 설정한 비밀번호 
```
이제 compass에 들어가서 사용하면 된다. 

### 몽고디비 기본 연결법 
```javascript
const mongoose = require('mongoose');

const connect = () => 
{
  if(process.env.NODE_ENV !== 'production')
  {
      mongoose.set('debug',true) // debug 모드 쿼리 발생
  }

mongoose.connect('mongodb://root:71312m@localhost:27017/admin',{
  dbName : 'nodejs',
  useNewUrlParser : true,
  useCreateIndex : true,
}, (error) => {
  if(error){
    console.log('몽고디비 연결 에러',error);
  }
  else{
    console.log('몽고디비 연결 성공')
  }
});
};

mongoose.connection.on('error',(error) => 
{
  console.error('몽고디비 에러')
})

mongoose.connection.on('disconnected', () => 
{
  console.error('몽고디비 연결 끊어짐 ')
  connect();
})

module.exports = connect;
```
