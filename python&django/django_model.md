> 장고에서는 ORM을 사용해서 쿼리없이 테이블을 생성할 수 있다. 

```python
from django.db import models

# Create your models here.

class Blog(models.Model):
  title = models.CharField(max_length = 200) 
  body = models.TextField()
  date = models.DateTimeField(auto_now_add=True)

```
- 이렇게 객체를 생성해준다

![](https://images.velog.io/images/jemin0312/post/12f1cebe-d6f5-49af-9793-ac05e16ee71c/%EC%BA%A1%EC%B2%98.PNG)

❗ 처음 runserver를 하면 이런 오류 메세지가 뜬다. 
 - db에 migration이  반영이 되지 않았기 때문이다 
```python
python manage.py migrate     // 초기화 작업 
```
초기화를 한번 해줬다면 객체를 생성하고, 먼저 migration file을 생성해줘야한다. 
```python
python manage.py makemigration    // 변경사항 저장
python manage.py migrate // 변경사항 db에 날리기 
```
> 변경된 사항은 admin 경로에 들어가서 쉽게 볼 수 있다. 

```python
python manage.py createsuperuser   // 관리자를 만드는 명령어 
```
![](https://images.velog.io/images/jemin0312/post/08b1ee9f-9a4d-4f15-b086-d8e92a3fbe6b/%EC%BA%A1%EC%B2%98.PNG)

- 자! 이제 어드민 경로에 접속할수 있다. 
![](https://images.velog.io/images/jemin0312/post/e535e908-a541-435f-81ab-4bbf66bf23f5/%EC%BA%A1%EC%B2%982.PNG)
- admin.py에 해당 내용을 추가 해줘야한다. 여기서 Blog는 추가한 객체이다
```python
// 만약 admin 페이지에서 내가 지정하는 필드값이 대표값으로 보이게 하고 싶다면 
  def __str__(self) : 
    return self.title  
  작성 해주면 된다. 
```
