1. cookie-parser는 클라이언트에서 보낸 쿠키를 파싱해서 req.cookies 안에 넣어준다. 
```javascript
const cookieparser = require('cookie-parser')
app.use(cookieparser()) // 활성화 시키면 쿠키를 파싱할 수 있다. 
app.use(cookieparser(process.env.COOKIE_SECRET)) 
// 활성화시키면 서명키를 통해 내 쿠키가 맞는지 확인 할 수 있다. 
```
2. cookie를 생성하려면 res.cookie()를 사용하면 된다 
```javascript
res.cookie('name','jemin',{ options })
```
3. 여러가지 옵션들이 있다.
```javascript
maxAge?: number | undefined;
    signed?: boolean | undefined;
    expires?: Date | undefined;
    httpOnly?: boolean | undefined;
    path?: string | undefined;
    domain?: string | undefined;
    secure?: boolean | undefined; // 이 옵션 활성화시 쿠키에 서명 할수 있다 
```
4. 서명된 쿠키는 req.signedCookies 안에 저장된다. 

여기서 서명을 할때는 어떤 비밀키를 쓸까? 바로 우리가 cookieparser(비밀키)에 집어넣은 비밀키가 자동으로 서명으로 사용된다! 
