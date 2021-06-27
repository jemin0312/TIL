```java
public interface MemberRepository extends JpaRepository<Member,Long>
```

- 인터페이스만 있는데 우리가 어떻게 기능을 쓸까? 
    - 해당 인터페이스를 보고 스프링 데이터 jpa가 구현체를 만들어서 프록시를 만들고 injection을 해준다! 
    
> @Repository가 없더라도 JpaRepository를 상속했다면 알아서 스프링이 인지를 한다. 

------
> JpaRepository는 어떻게 구성이 되어있을까? 

```java
package org.springframework.data.jpa.repository;
public interface JpaRepository<T, ID>
```

- JpaRepository는 jpa에 특화 되어있는 기능이다

```java
package org.springframework.data.repository;
PagingAndSortingRepository<T, ID> extends CrudRepository<T, ID>
```

- 둘다 spring-data를 통해 공통으로 제공되는 기능이다. jpa 한정이 아니다. 


```java
@Query("select m from Member m where m.username = :username and m.age = :age")
List<Member> findMember(@Param("username") String username, @Param("age") int age)
```

복잡한 쿼리를 작성해야 할때는 @Query를 쓸 수 있다!! 
❗ @Query의 장점 : jpql 쿼리의 내용이 틀렸다면 컴파일 시점에 오류를 잡아준다!! 
  정적쿼리이므로 컴파일 시점에 미리 파싱을 해서 sql로 변환시킨다. 그때 오류를 잡아준다. 
  
  -----
  ```java
public interface MemberRepository extends JpaRepository<Member,Long>
```

- 인터페이스만 있는데 우리가 어떻게 기능을 쓸까? 
    - 해당 인터페이스를 보고 스프링 데이터 jpa가 구현체를 만들어서 프록시를 만들고 injection을 해준다! 
    
> @Repository가 없더라도 JpaRepository를 상속했다면 알아서 스프링이 인지를 한다. 

------
> JpaRepository는 어떻게 구성이 되어있을까? 

```java
package org.springframework.data.jpa.repository;
public interface JpaRepository<T, ID>
```

- JpaRepository는 jpa에 특화 되어있는 기능이다

```java
package org.springframework.data.repository;
PagingAndSortingRepository<T, ID> extends CrudRepository<T, ID>
```

- 둘다 spring-data를 통해 공통으로 제공되는 기능이다. jpa 한정이 아니다. 


```java
@Query("select m from Member m where m.username = :username and m.age = :age")
List<Member> findMember(@Param("username") String username, @Param("age") int age)
```

복잡한 쿼리를 작성해야 할때는 @Query를 쓸 수 있다!! 
❗ @Query의 장점 : jpql 쿼리의 내용이 틀렸다면 컴파일 시점에 오류를 잡아준다!! 
  정적쿼리이므로 컴파일 시점에 미리 파싱을 해서 sql로 변환시킨다. 그때 오류를 잡아준다. 

------

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

