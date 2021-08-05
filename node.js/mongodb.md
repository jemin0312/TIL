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
### 스키마 작성법 
```javascript
const {User} = require('./models/User')
mongoose.connect(MONGO_URI,{useNewUrlParser : true, useUnifiedTopology : true}).then(result => console.log(result)).catch(error => console.log(error))
```
