```shell
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR , 'static');

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

MEDIA_URL = '/media/'
```
settings.py 에 들어갈 기본 설정 
```shell
from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
urls.py에 들어가는 기본 정보 
```python
<form action="" method="POST" enctype="multipart/form-data">
// form 데이터로 이미지 받을때 들어가는 태그 
```
```html
<img src="{{blog_detail.photo.url }}" alt="" height="600">
// 이미지 렌더링할때 방법 
```
```python
photo = models.ImageField(blank=True, null=True, upload_to='blog_photo') # 사진 생성시 마다 media안에 blog_photo 자동 생성 
```
