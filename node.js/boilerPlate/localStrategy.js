const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const User = require('../models/user')
const bcrypt = require('bcrypt')
module.exports = () => {

  passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
    
  },
  async (email, password, done) => {
  
    // 로그인할때 뭐가 필요할까? 
    try
    {
      const exUser = await User.findOne({where : {email}})
    
      if(exUser)
      { 
        
        const result = await bcrypt.compare(password, exUser.password)
        if(result)
        {
         
          done(null,exUser)
        }
        else
        {
          done(null,false,{message : '비밀번호가 틀렸습니다'})
        }
      }
      else
      {
        done(null,false,{message : '회원가입이 되지 않았습니다'})
      }
  
    }
    catch(error)
    {
      console.error(error)
      done(error)
    }
  }
  ))
  
}