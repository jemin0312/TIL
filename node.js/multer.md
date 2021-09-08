### multer 기본 로직 
```javascript
try{
  fs.readdirSync('uploads');
}
catch(error)
{
  console.error('upload 폴더가 없어서 만들어줍니다!')
  fs.mkdirSync('uploads')
}
const upload = multer({
  storage : multer.diskStorage({
    destination(req,file,done)
    {
      done(null,'uploads/')
    },
    filename(req,file,done)
    {
      const ext = path.extname(file.originalname)
      done(null,path.basename(file.originalname,ext) + Date.now() + ext);
    }
  }),
  limits : {fileSize : 5 * 1024* 1024}
})
```
