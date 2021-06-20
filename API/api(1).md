_김영한님의 강의를 바탕으로한 정리입니다_
[해당 강의 링크](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8-JPA-API%EA%B0%9C%EB%B0%9C-%EC%84%B1%EB%8A%A5%EC%B5%9C%EC%A0%81%ED%99%94/dashboard)
### API 컨트롤러 생성

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

- 반대로 @RequestBody를 써서 매개변수를 받아야 json 형태의 post를 받을 수 있다! 
---
![](https://images.velog.io/images/jemin0312/post/f144e9cf-866d-4b78-b460-ae11fa6a8f4c/%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202021-06-20%20161641.png)

![](https://images.velog.io/images/jemin0312/post/aedb70e1-b52e-4469-a079-b7b8220a3673/%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202021-06-20%20161710.png)

> json을 통해 값을 받을 때 특정한 필드값은 null 허용하지 않으려면
매개변수에 @Valid, 필드값에 @NotEmpty를 붙여주면 된다.
❗ @NotEmpty는 validation이라는 dependencies를 추가해야 사용 가능하다. 

### DTO 생성 
> 현재 controller의 매개변수는 엔티티를 그대로 사용하고 있다. 

- 엔티티를 그대로 사용하면 **치명적** 문제점들이 발생한다.
1.해당 엔티티를 사용하는 여러개의 컨트롤러들의 요구사항에 따라 엔티티를 계속 변경해야한다.
2.엔티티를 수정하면 api 스펙이 틀려져서 클라이언트와의 통신이 어려워진다.(ex> 클라이언트는 name이라는 이름으로 json을 쐈는데 엔티티의 필드는 username으로 변경되어있다면 통신이 틀어진다)
> 엔티티를 변경할 필요없는, 오직 데이터 송수신을 위한 
DTO를 만들어야한다.

✔ 엔티티 대신 DTO를 사용했을때의 **장점**

```java
@Entity
public class Member {

    @Id @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    @NotEmpty
    private String name;

    @Embedded
    private Address address;

    @OneToMany(mappedBy = "member")
    private List<Order> orders = new ArrayList<>();
} 
```
> 엔티티를 매개변수로 받으면 API 스펙을 확인해보지 않는 이상 어느 필드 값이 
들어오는지 알 방법이 없다.

```java
public class MemberDTO
{

private String memberName;

}
```
> DTO를 사용하면 API 스펙상 요구하는 필드만 fit하게 설정할수 있어서 DTO만 보고도 
어떤 값이 들어올지 파악할수 있다. 

⚠ 그냥 개발할때는 요청을 받는거나 응답을 내려줄때 절대! 엔티티를 직접 사용하지 말자!! 
