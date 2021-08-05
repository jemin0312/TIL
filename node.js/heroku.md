```shell
cd my-project/
$ git init
$ heroku git:remote -a <app-name>
```  
  
  ----
  
 ```shell 
   git add .
$ git commit -am "first commit"
$ git push heroku master -> 이 명령어에서 에러가 발생한다면 git push heroku HEAD:master로 하길
안움직이면 heroku ps:scale web=1
```
