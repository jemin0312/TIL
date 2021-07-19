## JWT 
json 포맷을 사용하며 header,payload,signature으로 구성되어있다.
- Header : 사용 알고리즘과 타입 
- Payload : 전달 정보 
- Signature : 인코딩에 사용되는 시크릿 
### JWT의 장점 
- STATELESS로 운영되서 서버 확장에 유리하다.
### JWT의 단점 
- 서버와 클라이언트간에 중요 정보를 계속 주고받아야한다. 
- 유효기간을 두지 않는다면 영구 지속됨으로 해킹 위험이 있다. 
### 사용법 
```javascript
const secret = 'fegregdfewr343sefe' // encoding을 위한 secret key
const token  = jwt.sign({   
  id : 'userId',
  isAdmin : true,
}, secret,
{expiresIn: 2}    // option , 유효기간 2초로 해놨기에 2초뒤에 유효성 검사시 false 
);
```
### payload의 정보가 변경되었는지 확인하는법 
```javascript
jwt.verify(token,secret, (error, decoded) => 
{
  console.log(error,decoded);    // 발급된 토큰과 secret key를 넣으면 원래 토큰이 맞는지 확인가능 
})
```
