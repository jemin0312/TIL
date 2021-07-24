미들웨어에서 비동기 처리를 할때 .catch() 처리를 해주지 않으면 서버가 뻗을 수 있다. 따라서 내가 설정한 error 처리 코드로 이동하려면 조치를 해줘야 한다. 
```javascript
import 'express-async-errors' // 비동기 처리를 명시해주면 알아서 error 코드로 이동해줌
                              // express 5 버전 미만에서는 꼭 지정해줘야함 
```
비동기 처리의 형태에는 두가지가 있다
```javascript
1. app.get('/file', (req,res) => {

  return fsAsync.readfile('file.txt').then((data) => console.log(data))

})

2. app.get('/files', async function(req,res) {
    const result = await fsAsync.readfile('file.txt').then((data) => console.log(data))
})
```
위의 형태는 express가 비동기인것을 확인 할 수 있으므로 자동으로 내가 지정한 error 코드로 넘어간다. 
