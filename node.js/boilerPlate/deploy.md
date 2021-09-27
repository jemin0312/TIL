###배포시 필요한 옵션 

```javascript
if(process.env.NODE_ENV === 'production')
{
  app.use(morgan('combined'))  
  app.use(helmet({contentSecurityPolicy : false}))
  app.use(hpp())
}
else
{
  app.use(morgan('dev')); 
}

"start": "cross-env NODE_ENV=production PORT=80 pm2 start app.js -i 0",

```


### lightsail 배포하는 법 
✔ 배포하는 법 
- sudo su     // 관리자 계정으로 전환
- sudo apt-get update

- sudo apt-get -t build-essential
- sudo apt-get install curl
- curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash --
- sudo apt-get install -y nodejs

remove anonymous users 부터해서 
y n y y 

mysql -uroot -p  // 비밀번호 설정 나오면 로컬이랑 같도록!

https://github.com/jemlog/book_review_backend.git

폴더 들어가서 vim .env로 작성 
종료 후에는 cat .env 해줌 
그 뒤에 sudo npm i 해줌 

중요 여기서 설정하는 비밀번호와 원래 비밀번호 같아야함 

mysql -uroot -p 해서 들어간 후에 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '내 비밀번호'

npx sequelize db:create --env production

sudo npm start && sudo npx pm2 monit 

// pull 안될때 사용하는 방법
# git stash && git pull origin master && git stash pop
