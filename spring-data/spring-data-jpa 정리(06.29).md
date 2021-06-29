### 벌크성 수정 쿼리

```java
@Modifying 이 무조건 붙어 있어야 기존의 select 처럼 resultList나 singleResult가 안나온다 즉 executeUpdate로 나온다.
@Query("update Member m set m.age = m.age + 1 where m.age >= :age")
int bulkAge(@Param("age") int age);
```

> 원래 jpa에서 엔티티는 영속성 컨텍스트의 관리를 받는다 

- 그러나 벌크 연산은 db에 바로 조작을 가해버린다. 즉 내가 save한 엔티티가 아직 영속성 컨텍스트 1차 캐시에 있는 상태라면 불일치가 일어날수 있다!! 
- 중요! jpql이 실행이 되면 먼저 flush()가 일어난다. 그러면 이전까지의 sql들이 모두 db에 반영이 된다. 그 다음으로 벌크연산을 때리면 바로 db값이 업데이트가 된다 -> em.clear()를 시켜서 1차 캐시를 모두 초기화 해준뒤에 db의 값을 새로 find해서 가져온다. 

```java
@Modifiying(clearAutomatically = true)
```
이걸 사용하면 em.clear()를 따로 안해줘도 자동으로 영속성 컨텍스트 초기화가 된다. 


> 만약에 @PathVariable로 pk값인 id를 받는다면? 
```java
  @GetMapping("/members/{id}")
    public String findMember(@PathVariable("id") Member member)
    {
     return member.getUsername();
    }
```
- 이런 식으로 그냥 멤버를 그대로 받아버리면 된다. 알아서 id값에 맞는 member를 찾아와준다! 
- 중요한건 도메인 클래스 컨버터는 트랜젝션 범위 밖에서 작동하기에 수정, 등록이 되지는 않는다, 
   - 그러므로 조회 시에만 사용을 해줘야 한다! 
   
 ### mvc 도메인 컨버터, 페이징/정렬 
 
 > mvc에서 쓸수 있도록 바로 pageable을 적용시킬 수 있다 
 
 ```java
   @GetMapping("/members")    // pageable은 파라미터 인터페이스, page는 결과정보 인터페이스
    public Page<Member> list(Pageable pageable)
    {
        Page<Member> all = memberRepository.findAll(pageable); // 기본 제공 메서드에 pageable 넣으면 사용 가능이다다
        return all;
    }
 ```
 
 ```shell
 http://localhost:8080/members?page=0&size=3
 ```
 - 이렇게 작성하면 첫번째 페이지로 3개가 나온다. 
 ```shell
 {
content: [
{
createdDate: "2021-06-29T01:51:42.315392",
lastModifiedDate: "2021-06-29T01:51:42.315392",
createdBy: "6fb832bf-326a-4100-a12b-7ace4b8d057e",
lastModifiedBy: "6fb832bf-326a-4100-a12b-7ace4b8d057e",
id: 1,
username: "user0",
age: 0,
team: null
},
{
createdDate: "2021-06-29T01:51:42.350392",
lastModifiedDate: "2021-06-29T01:51:42.350392",
createdBy: "eb60cdf2-393e-45d7-9468-a699d205e142",
lastModifiedBy: "eb60cdf2-393e-45d7-9468-a699d205e142",
id: 2,
username: "user1",
age: 1,
team: null
},
{
createdDate: "2021-06-29T01:51:42.3554",
lastModifiedDate: "2021-06-29T01:51:42.3554",
createdBy: "bd7f5237-647c-4cde-9c1d-0acc98a6bed7",
lastModifiedBy: "bd7f5237-647c-4cde-9c1d-0acc98a6bed7",
id: 3,
username: "user2",
age: 2,
team: null
}
]
 ```
 > 만약 아무것도 설정하지 않았다면?
 
 - 20개가 디폴트로 출력이 된다!!! 
 > 만약 20개를 다른 숫자로 바꾸고 싶다면?
 
 ```java
  data:
    web:
      pageable:
        default-page-size: 10
 ```
 - application.yml에 위의 내용을 추가해주자 
 
 pageable을 자동으로 설정 할수 있는 방법 
 
 1. 컨트롤러에서 파라미터가 pageable이라면 
 2. pageRequest라는 객체를 만들어서 
 3. 주입을 시켜준다. 
 
 ```java
 http://localhost:8080/members?page=0&size=3&sort=id,desc
 ```
 - sort 기능도 사용할수 있다. 
 ```java
 {
content: [
{
createdDate: "2021-06-29T01:51:42.555354",
lastModifiedDate: "2021-06-29T01:51:42.555354",
createdBy: "ee22a511-1c3d-487f-9786-17207529b6ca",
lastModifiedBy: "ee22a511-1c3d-487f-9786-17207529b6ca",
id: 100,
username: "user99",
age: 99,
team: null
},
{
createdDate: "2021-06-29T01:51:42.553354",
lastModifiedDate: "2021-06-29T01:51:42.553354",
createdBy: "f2a5dbfa-799f-4e67-b1ac-ef44cb65f43f",
lastModifiedBy: "f2a5dbfa-799f-4e67-b1ac-ef44cb65f43f",
id: 99,
username: "user98",
age: 98,
team: null
},
{
createdDate: "2021-06-29T01:51:42.552354",
lastModifiedDate: "2021-06-29T01:51:42.552354",
createdBy: "fd0da6cc-ae56-4a3b-bb8c-970d7d6016b5",
lastModifiedBy: "fd0da6cc-ae56-4a3b-bb8c-970d7d6016b5",
id: 98,
username: "user97",
age: 97,
team: null
}
]
 ```
 
> 글로벌로 적용하는게 아니라 개별 메서드별로 page 제한을 걸려면?

```java
 @GetMapping("/members")    // pageable은 파라미터 인터페이스, page는 결과정보 인터페이스
    public Page<Member> list(@PageableDefault(size = 5 , sort = "username") Pageable pageable)
    {
        Page<Member> all = memberRepository.findAll(pageable); // 기본 제공 메서드에 pageable 넣으면 사용 가능이다다
        return all;
    }
```
