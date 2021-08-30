### 몽구스 schemas/index.js 기본 세팅 
```javascript 
const mongoose = require('mongoose')

const connect = () => {
  if(process.env.NODE_ENV !== 'production')
  {
    mongoose.set('debug',true)
  }
}

mongoose.connect('mongodb+srv://jemin:e1q3Qh66ySXWcG06@cluster0.mqlmq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{dbName : 'jemindb', useNewUrlParser : true, useCreateIndex : true},(error) => {
  if(error)
  {
    console.log('error',error)
  }
  else
  {
    console.log('connect success')
  }
})

mongoose.connection.on('error', (error) => {
  console.log('몽고db 연결 에러',error)
})

mongoose.connection.on('disconnection',() => {
  console.log('몽고 db 연결 실패!');
  connect()
})

module.exports = connect;
```
### 몽구스 스키마 작성 schemas/db.js

```javascript
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
     
  username : {
    type : String,
    required : true
  },
  name : {
    first : {
      type : String,
      required : true
    },
    last : {
      type : String, 
      required : true 
    }
  },
  age : Number ,
  email : String 
     

},
{
  timestamps : true
})


const User = mongoose.model('user',UserSchema)
module.exports = { User }
```
### 원하는 곳에서 쓰고 싶을때  
```javascript
const {User} = require('./models/User')
```
