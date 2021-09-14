```javascript
exports.verifyToken = (req,res,next) => {

  try
  {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    // header에 authorization이라는 이름으로 jwt 넣어놓음
    next()
  }
  catch(error)
  {
    if(error.name === 'TokenExpiredError')
    {
      return res.status(419).json({
        code : 419,
        message : '토큰이 만료되었습니다'
      })
    }
    return res.status(401).json({
      code : 401,
      message : '유효하지 않은 토큰입니다'
    })
  }
}

```
