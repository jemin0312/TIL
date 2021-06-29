> 벌크성 수정 쿼리 

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
