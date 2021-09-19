const passport = require('passport')

exports.isLoggedIn = (req,res,next) => {

  if(req.isAuthenticated())
  {
    console.log('isLoggedIn 통과')
    next()
    
  }
  else
  {
    res.status(419).send('로그인 필요')
  }
}

exports.isNotLoggedIn = (req,res,next) => {

  if(!req.isAuthenticated())
  {
    console.log('isNotLoggedIn 통과')
    next()
  }
  else
  {
    return res.json({message : '로그인을 해제해야 합니다'})
  }
}
