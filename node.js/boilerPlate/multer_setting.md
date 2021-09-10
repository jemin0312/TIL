### multer 기본 세팅법 

```javascript

try{
  fs.readdirSync('uploads');   
}
catch(error)
{
  console.error('upload 폴더가 없어서 만들어줍니다!')
  fs.mkdirSync('uploads')
}
// 원하는 폴더가 있는지 없는지 확인한뒤, 없다면 생성해준다. 

const upload = multer({
  // storage : multer.diskStorage({
  //   destination(req,file,done)
  //   {
  //     done(null,'uploads/')
  //   },
  //   filename(req,file,done)
  //   {
  //     const ext = path.extname(file.originalname)
  //     done(null,path.basename(file.originalname,ext) + Date.now() + ext);
  //   }
  // }),
  // limits : {fileSize : 5 * 1024* 1024}
  storage : multer.diskStorage({
    destination(req,file,done)
    {
      done(null,'uploads/')
  },

  filename(req,file,done){
    const ext = path.extname(file.originalname)
    done(null,path.basename(file.originalname,ext) + Date.now() + ext)
  }

}),limits : { fileSize : 5*1024*1024}
})
```
