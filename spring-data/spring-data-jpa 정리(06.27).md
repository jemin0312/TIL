개발자들이 단순히 반복하던 개발 코드들을 확 줄여주기 때문에 개발자는 비즈니스 로직 작성에만
집중을 하면 된다. 스프링 jpa는 선택이 아닌 필수이다!! 
hikariCP : 데이터베이스 커넥션 풀에 사용하는 라이브러리이다! 

------
```java
@SpringBootTest
```
테스트 할때 스프링 컨테이너에서 주입을 받으려면 이 어노테이션을 작성해야 한다. 

-----
같은 트랜젝션 안에서는 영속성 컨텍스트의 동일성을 보장한다. 예를 들어 내가 a를 저장하고 영속성 컨텍스트에서 a를 다시 찾아왔다면 두개는 동일성이 보장된다. 

----
스프링 데이터 jpa의 findById 같은 경우에는 Optional로 결과값이 포장되서 나온다. 여기서 포장을 까서 값으로 쓰려면 맨뒤에 .get()을 붙여줘야한다. 
```java
   Member findMember = memberRepository.findById(saveMember.getId()).get();
```

- 스프링 데이터 jpa의 신기한점 : 인터페이스만 있는데 기능이 실행이 된다? 
  - 인터페이스만 만들면 스프링 데이터 jpa가 알아서 구현체를 넣어준다. 
  
----
쿼리 파라미터 바인딩을 이쁘게 해주는 라이브러리로 p6spy가 있다. 
실무에서는 성능 테스트 해보고 써야한다. 

-----
```java
@NoArgsConstructor(access = AccessLevel.PROTECTED)
```
기본 생성자 만들때 붙여주고 접근성 변경하려면 access를 붙여주자 

----
tostring메서드도 어노테이션으로 만들 수 있다
```java
@ToString(of = {"id","username","age"})
```

-----
- Optional로 반환을 하고 싶을 때 

Optional은 null값도 반환하고 싶을때 쓰는 래핑이다. 
```java
Optional.ofNullable(member) 
```
이렇게 쓴다. 

-------
```java
em.createQuery
```
이 메서드를 사용할때 리스트로 나올 여지가 없으면 
```java
.getSingleResult를 사용하고 
```
리스트로 나올 확률이 조금이라도 있다면 
```java
.getResultList()
```
사용하기 
