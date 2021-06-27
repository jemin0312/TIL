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

