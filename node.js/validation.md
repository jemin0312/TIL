> 데이터베이스에서 validation 검사를 하기 전에 서버에서 선제적으로 해줘야 한다. 
되도록 빨리 해줘야 한다. 클라이언트에서의 validation 검사는 optional이다 그러므로 서버에서는 필수적으로 해줘야한다. 

```javascript
import express-validation

router.post('/',body('name')
            .isLength({min:2})
            .withMessage('not good' ), // msg로 추가적으로 보내고 싶은 메세지 
            (req,res,next) => {
  const error = validationResult(req) // 위의 검사에서 걸리면 req에 에러가 들어간다. 
  if(!error.isEmpty())
  {
    res.status(400).json({message : error.array()}); // 에러에 관련된 메세지 보냄 
  }
  console.log(req.body)
  res.sendStatus(201);
}
```

꼭 body를 사용하는게 아니라, 들어오는 param에 대해 검사하고 싶다면 param('name') 이런 식으로도 쓸 수 있다. 

```javascript

router.post('/',
 [body('name').isLength({max : 1}).notEmpty(),
  body('age').isLength({max : 2})
 ],  // 이런 식으로 validation 부분을 배열로 묶을 수도 있다. 
  (req,res,next) => {
    res.sendStatus(404);
  })
```

### validationResult 중복 제거  
위의 validation 코드를 그대로 유지하면, 미들웨어마다 중복된 코드를 작성해줘야 한다.
그러므로 에러 처리 부분을 밖으로 빼내주자

```javascript
const validate = (req,res,next) => {

  const errors = validationResult(req);
  if(errors.isEmpty())
  {
    return next();
  }
  res.send(404).json({message : errors.array()})
}
```

그다음으로 미들웨어를 묶어놓은 배열에 넣어주자
```javascript

router.post('/',
 [body('name').isLength({max : 1}).notEmpty(),
  body('age').isLength({max : 2}),
  validate, // 배열 안에 집어넣어줬다. 
 ],  // 이런 식으로 validation 부분을 배열로 묶을 수도 있다. 
  (req,res,next) => {
    res.sendStatus(404);
  })
```

### Sanitation
validation을 할때는 먼저 데이터를 정돈 해놓은 뒤에 유효성 검사를 진행해야 한다. 
```json
"name" : "   " 
```
만약 이 데이터를 유효성 검사시 body('name').isLength({min : 2}) 라고 한다면 검사는 통과된다. 이를 방지하기 위해서 공백을 제거하는 등의 데이터 정리를 먼저 한 뒤에 검사를 해야한다. 
```javascript

router.post('/',
 [body('name').trim().isLength({max : 1}).notEmpty(),
  body('age').isLength({max : 2}),
```
 - trim() : 공백이 있다면 공백을 모두 제거해준다. 
