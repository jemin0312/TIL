## 장고 기본 세팅법 
1. 가상환경을 세팅해준다 
```shell
python -m venv '원하는 이름'
```
2. 가상환경을 활성화 시켜준다
```shell
source '내 가상환경 이름'/scripts/activate
```
3. 가상환경이 활성화 되었다면 장고를 설치해준다 
```shell
pip install django
```
4. 장고 프로젝트를 만들어준다
```shell
django-adimin startproject '원하는 이름'
```
5. 장고 프로젝트로 경로 이동해서 manage.py를 통해 서버를 띄운다
```shell
python manage.py runserver
```
✔ manage.py에는 여러가지 기능이 있다. 
  - 서버를 띄울수 있게 해준다 
  - 애플리케이션을 만들 수 있게 해준다 
  ```shell
  python manage.py startapp '원하는이름'
  ```
  - 관리자를 설정할수 있게 해준다. 
  - DB 초기화를 시켜준다. 

> 애플리케이션을 만들었다면 장고 프로젝트의 setting.py에 앱을 등록했음을 알려야한다. 

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'account'
```

> 경로를 추가해주고 싶을때는 urls.py에 등록을 해줘야한다. 

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home , name='home'),
]
```
