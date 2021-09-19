const passport = require('passport')
const Local = require('./localStrategy')
const User = require('../models/user')



// passport.serialize
module.exports = () => {

  passport.serializeUser((user,done)=> {

    done(null,user.id)   // 세션에 아이디 저장 

  })

  passport.deserializeUser((id,done) => {

    // deserializeUser는 매 요청마다 passport.session에 의해서 호출된다. 
    // 세션에 들어있는 id값으로 DB에서 USER 정보를 가져온다.
    // 가져온 USER 정보를 done(null,user)에 집어넣는다. 
    // req.user로 들어가서 로그인후, 해당 user의 정보를 계속 사용할 수 있다. 
    User.findOne({where : {id}})
    .then(user => done(null,user))  
    .catch(err => done(err))   // db에서 찾아서 넣어준다. 
  })

  Local()

}