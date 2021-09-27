### 배포시에 반드시 설정 해줘야 하는 요소 

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

"start": "cross-env NODE_ENV=production PORT=80 pm2 start app.js -i 0",  // nginx 설치시 PORT=80은 불필요

```


### lightsail 배포하는 법 
✔ 배포하는 법 
- sudo su     // 관리자 계정으로 전환
- sudo apt-get update

- sudo apt-get install -y build-essential
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

### NGINX 설정
- sudo apt-get update && sudo apt-get install nginx
- nginx 실행 안되면 sudo service nginx start로 확인 
- /etc/nginx: 해당 디렉터리는 Nginx를 설정하는 디렉터리입니다.모든 설정을 이 디렉터리 안에서 합니다.
- /etc/nginx/nginx.conf: Ngnix의 메인 설정 파일로 Nginx의 글로벌 설정을 수정 할 수 있습니다.

- /etc/nginx/sites-available: 해당 디렉터리에서 프록시 설정 및 어떻게 요청을 처리해야 할지에 대해 설정 할 수 있습니다.

- /etc/nginx/sites-enabled: 해당 디렉터리는 sites-available 디렉터리에서 연결된 파일들이 존재하는 곳 입니다.이 곳에 디렉터리와 연결이 되어 있어야 nginx가 프록시 설정을 적용합니다.

- /etc/nginx/snippets: sites-available 디렉터리에 있는 파일들에 공통적으로 포함될 수 있는 설정들을 정의할 수 있는 디렉터리 입니다.

- /etc/nginx/sties-available 로 이동 
- sudo vi node-server(이름은 내 마음대로 가능)
```shell
server{
 listen 80;
 server_name '내 lightsail 서버 주소';
 location / {
    proxy_pass http://127.0.0.1:3001;
 }
}
```
- sudo ln -s /etc/nginx/sites-available/(내가 설정한 이름) /etc/nginx/sites-enabled
- ls -al로 확인
- sudo service nginx restart

// pull 안될때 사용하는 방법
# git stash && git pull origin master && git stash pop
