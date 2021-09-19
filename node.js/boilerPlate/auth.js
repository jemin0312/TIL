const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const passport = require('passport')
const {isLoggedIn, isNotLoggedIn} = require('../middleware/auth')

// 1. 회원가입 
router.post('/join', isNotLoggedIn, async (req,res,next) => {
  
  const {email , nick , password} = req.body;
  try
  {
      const exUser = await User.findOne({where : {email}})
      if(exUser)
      {
        return res.json({message  :' 이미 가입된 회원입니다'})
      }
      const hashed = await bcrypt.hash(password,12);
      await User.create({
        email, 
        nick, 
        password : hashed
      })
      return res.redirect('/')
  }
  catch(error)
  {
    console.error(error)
    next(err)
  }

})

router.post('/login', isNotLoggedIn, async (req,res,next) => {
 
    passport.authenticate('local', (autherror, user, info) => {

       if(autherror)
       {
         console.error(autherror)  // 에러류가 발생했을때는 next로 넘기기
         return next(autherror)
       }
    
       if(!user)
       {
         return res.json({message : '유저가 없습니다'})  // 나머지를 리다이렉트 하면서 표시 
       }
       
      return req.logIn(user,(loginError) => {  // serialize로 넘어감 => session에 id만 저장 
         if(loginError)
         {
           console.error(loginError)
           return next(loginError)  // 걍 error.html에 실어야될것 같은건 next(error)
         }
         return res.redirect('/?message=complete')
       })
    })(req,res,next)
  


})


// 2. 로그인 

router.get('/logout', isLoggedIn, (req,res,next) => {

  req.logOut()
  req.session.destroy()
  res.redirect('/')
})

// 3. 로그아웃 



module.exports = router;