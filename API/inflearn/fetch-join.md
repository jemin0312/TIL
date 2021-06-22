### fetch join 사용
> 실무에서 일어나는 성능 저하 문제의 90%는 n+1에서 발생한다. 
기본적으로 lazy를 모두 사용하고 한번에 다 끌고와야 하는 순간에만 fetch join을 적절히 사용한다면 모든 실무문제를 해결할수 있다. 

```java

@GetMapping("/api/v3/simple-order")
public List<SimpleOrderDto> orders()
{
   List<Order> orders = orderRepository.findAllWithMemberDelivery();
   return orders.stream().map(o-> new SimpleOrderDto(o)).collect(Collectors.toList());
}

public List<Order> findAllWithMemberDelivery()
{
    return em.createQuery("select o From Order o join fetch o.member join fetch o.delivery, Order.class).getResultList();
}
```
fetch join을 사용하여 쿼리를 작성했다
```shell
select
        order0_.order_id as order_id1_4_0_,
        member1_.member_id as member_i1_2_1_,
        delivery2_.delivery_id as delivery1_0_2_,
        order0_.delivery_id as delivery4_4_0_,
        order0_.member_id as member_i5_4_0_,
        order0_.order_date as order_da2_4_0_,
        order0_.status as status3_4_0_,
        member1_.city as city2_2_1_,
        member1_.street as street3_2_1_,
        member1_.zipcode as zipcode4_2_1_,
        member1_.name as name5_2_1_,
        delivery2_.city as city2_0_2_,
        delivery2_.street as street3_0_2_,
        delivery2_.zipcode as zipcode4_0_2_,
        delivery2_.status as status5_0_2_ 
    from
        orders order0_ 
    inner join
        member member1_ 
            on order0_.member_id=member1_.member_id 
    inner join
        delivery delivery2_ 
```
> 처음의 select문 한방에 fetch join한 모든 엔티티들을 같이 땡겨왔다. 이때는 1번만 쿼리를 쏘면 된다. 
---
> 만약 fetch join만으로 땡기면 api 스펙에 필요하지 않는 필드들까지 다 땡긴다. 더 최적화를 할 수도 있을까?

😀 복잡한 쿼리를 뽑아내거나 dto를 바로 반환하는 메서드를 repository에 넣어놓을수도 있지만 , 유지보수성이 떨어진다. 
그러므로 repository 패키지안에 별도의 queryRepository를 만들어서 따로 다뤄야한다!! 
