### 처음 heroku 세팅 
```shell
1. heroku login 실행 
2. 배포하고자 하는 브랜치를 따로 만들어야 한다. 즉 배포용 브랜치 
3. git checkout -b heroku-deployment
4. heroku git:remote -a '내 헤로쿠 프로젝트 이름'
== 여기서 postgresql로 db를 변경 해줘야 한다 == 
5. heroku addons:create heroku-postgresql:hobby-dev
6. heroku config로 db 정보 확인
```
![heroku-setting](https://user-images.githubusercontent.com/82302520/131981198-d2859d6f-a09e-4aa1-a815-38ffabc8bc93.PNG)

```
7. vscode로 돌아와서 npm i pg pg-hstore 설치 
8. config에 DB_PORT 추가 
9. const {host, port,  user,database, password} = config.db;  // port 추가 
export const sequelize = new SQ.Sequelize(database, user, password,{
  host,
  port, 
  dialect : 'postgres',
  dialectOptions : {     // dialect는 postgres로 변경 
    ssl : {              // dialectOptions 추가! // heroku는 ssl 사용 
      require : true,           
      rejectUnauthorized : false   // 오류 안뜨게 해주는 속성 
    }
  }
})

10. heroku 실행시에는 package.json에는 nodemon => node로 변경 필요 
11. Procfile 생성 후 web: node app.js 해줘도 된다.
12. git commit -am '원하는 내용'
13. git push heroku '내 브랜치 이름':master 
끝!! 
```
