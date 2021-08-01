### 몽고DB 초기 세팅 과정 
- C://program Files/mongodb/server/5.0/bin/mongod.exe 실행 
- C://program Files/mongodb/server/5.0/bin/mongo.exe 실행

중요! mongod를 실행시켜놓은 상태에서 mongo를 실행해야 한다. 
```shell
use admin // mongo.exe
```
```shell
db.createUser({user : 'root', pwd : '원하는 비밀번호,', roles : ['root']});
// 관리자 계정을 생성해준다
```
mongod와 mongo를 꺼준뒤,
```shell
mongod --auth // 실행해주기 
```
```shell
mongo -u root -p 내가 설정한 비밀번호 
```
이제 compass에 들어가서 사용하면 된다. 
