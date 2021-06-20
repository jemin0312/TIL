> 프로젝트를 제작할때 템플릿 엔진을 다루는 controller 패키지와 api를 사용하는 controller 패키지는 분할을 해야한다! 

- 예외처리를 할때 패키지 단위로 공통처리를 해야하는데, 화면을 보이는 controller와 api controller는 방식이 달라야 한다. 

```java
@RestController
public class ApiController{}
```

> 템플릿 엔진을 다루는 컨트롤러는 @Controller이지만 api는 @RestController를
사용한다.

![](https://images.velog.io/images/jemin0312/post/6ca43835-ac47-419d-a815-0b18f453c20a/%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202021-06-202%20155143.png)

- @RestController에 붙어있는 @ResponseBody 어노테이션은 @Controller가 return 값을 뷰리졸버로 보내 렌더링 시키는 것과 다르게, return 값을 그대로 http 응답 메세지에 
실어서 내보낸다. 

> 반대로 @RequestBody를 써서 매개변수를 받아야 json 형태의 post를 받을 수 있다! 

