### DTO를 이용한 연관관계 엔티티 반환 
> 단순히 DTO를 이용한 반환만으로 성능최적화가 이루어질까?

```java
 @GetMapping("/api/v2/simple-orders")
      public Result ordersV2()
      {
          //select문을 하나 날려서 order 리스트를 가지고 옴
          // n + 1 문제 발생
          List<Order> orders = orderRepository.findAllByCriteria(new OrderSearch());
          //루프
          List<SimpleOrderDto> collect = orders.stream()
                  .map(o -> new SimpleOrderDto(o))
                  .collect(Collectors.toList());
          return new Result(collect);

      }
```

위의 방법으로 DTO로 만들어낼수 있다. 
```java
 public SimpleOrderDto(Order order)
          {
              orderId = order.getId();
              name = order.getMember().getName(); //lazy 초기화
              orderDate = order.getOrderDate();
              orderStatus = order.getStatus();
              address = order.getDelivery().getAddress();  //lazy 초기화
          }
```
DTO를 만들어내는 생성자 코드이다. name과 address에서 프록시 초기화가 일어나는걸 알수있다.
> 여기서 postman을 이용해 조회를 하면 n+1이라는 문제가 발생한다. 

```shell
select
        order0_.order_id as order_id1_4_,
        order0_.delivery_id as delivery4_4_,
        order0_.member_id as member_i5_4_,
        order0_.order_date as order_da2_4_,
        order0_.status as status3_4_ 
    from
        orders order0_ 
    inner join
        member member1_ 
            on order0_.member_id=member1_.member_id 
    where
        1=1 limit ?
```
처음 List< Order >를 가져오는 쿼리이다
```shell
 select
        member0_.member_id as member_i1_2_0_,
        member0_.city as city2_2_0_,
        member0_.street as street3_2_0_,
        member0_.zipcode as zipcode4_2_0_,
        member0_.name as name5_2_0_ 
    from
        member member0_ 
    where
        member0_.member_id=?
```
DTO 생성시 getMember().getName()을 통해서 member 엔티티를 가져오는 쿼리이다
```shell
  select
        delivery0_.delivery_id as delivery1_0_0_,
        delivery0_.city as city2_0_0_,
        delivery0_.street as street3_0_0_,
        delivery0_.zipcode as zipcode4_0_0_,
        delivery0_.status as status5_0_0_ 
    from
        delivery delivery0_ 
    where
        delivery0_.delivery_id=?
```
똑같이 getAddress()를 통해 가져오는 쿼리 
```shell
  select
        member0_.member_id as member_i1_2_0_,
        member0_.city as city2_2_0_,
        member0_.street as street3_2_0_,
        member0_.zipcode as zipcode4_2_0_,
        member0_.name as name5_2_0_ 
    from
        member member0_ 
    where
        member0_.member_id=?
        
           select
        delivery0_.delivery_id as delivery1_0_0_,
        delivery0_.city as city2_0_0_,
        delivery0_.street as street3_0_0_,
        delivery0_.zipcode as zipcode4_0_0_,
        delivery0_.status as status5_0_0_ 
    from
        delivery delivery0_ 
    where
        delivery0_.delivery_id=?
```
> 문제는 order의 수가 늘어나면, dto를 초기화할때 늘어난 수만큼 계속 member와 address를 가져오는 쿼리를 날려야 된다.

- 최악의 경우에는 order의 수가 n일때 1 + n + n 만큼의 쿼리가 나가게 된다.  
- 📌 중요한점은 만약 불러오려는 member나 delivery가 영속성 컨텍스트 내부에 있다면 쿼리가 안날라간다. 
