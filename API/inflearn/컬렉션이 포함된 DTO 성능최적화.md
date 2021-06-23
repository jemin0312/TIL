> API 개발에서 어떤 작업이 가장 문제가 많이 될까?

- 등록/수정은 단건이기 때문에 간단하지만 '조회' 많은 성능 저하가 생긴다. 

> 특히 연관관계가 얽혀있는 조회의 경우 고려할것이 많다.

- 제일 중점사항은 나가는 쿼리의 수! 이걸 줄이는게 성능최적화의 관건이다. 

```java
 public List<Order> ordersV1()
    {
        List<Order> all = orderRepository.findAllByCriteria(new OrderSearch());
        for (Order order : all) {
            order.getMember().getName();
            order.getDelivery().getAddress();
            List<OrderItem> orderItems = order.getOrderItems();
            for (OrderItem orderItem : orderItems) {
                orderItem.getItem().getName();
            } }
        return all;  }
```

- 이 방식은 엔티티를 그대로 반환하는 방식이다. 제일 좋지 않은 방식 

- ❗ XtoOne 관계에 대한 해결책은 앞에서 살펴봤다. 이번에는 컬렉션이 포함되어있을때를 알아보자.

```java
 static class OrderDto
    {
       private Long orderId;
       private String name;
       private LocalDateTime orderDate;
       private OrderStatus orderStatus;
       private Address address;
       private List<OrderItemDto> orderItems;
```
- 컬렉션이 포함되어 있다면 dto 안에서 한번 더 컬렉션의 dto변환 작업을 진행해줘야한다.
> 이유 : 엔티티는 프록시 상태이기 때문에 이대로 api 응답을 하면 null값이나 오류가 뜬다. 

```java
 public OrderDto(Order o) {
            orderId = o.getId();
            name = o.getMember().getName();
            orderDate = o.getOrderDate();
            orderStatus = o.getStatus();
            address = o.getDelivery().getAddress();
            orderItems = o.getOrderItems().stream()
                    .map(orderItem -> new OrderItemDto(orderItem))
                    .collect(Collectors.toList());
```

- 이렇게 생성자 안에서 한번 더 dto 변환을 해주자 

```java
 public List<Order> findAllWithItem() {
        return em.createQuery("select o from Order o" +
                                     " join fetch o.member m" +
                                      " join fetch o.delivery d" +
                                      " join fetch o.orderItems oi" +
                                       " join fetch oi.item i", Order.class).getResultList();
    }
```
- 조회 쿼리는 똑같이 fetch join 사용해서 가져올수 있다. 

- ❗ 하지만 실제 select 조회결과를 보면 기대와 다르다

```shell
{
    "data": [
        {
            "orderId": 4,
            "name": "userA",
            "orderDate": "2021-06-23T17:15:43.841585",
            "orderStatus": "ORDER",
            "address": {
                "city": "서울",
                "street": "1",
                "zipcode": "1111"
            },
            "orderItems": [
                {
                    "itemName": "jpa1 book",
                    "orderPrice": 10000,
                    "count": 10000
                },
                {
                    "itemName": "jpa2 book",
                    "orderPrice": 20000,
                    "count": 20000
                }
            ]
        },
        {
            "orderId": 4,
            "name": "userA",
            "orderDate": "2021-06-23T17:15:43.841585",
            "orderStatus": "ORDER",
            "address": {
                "city": "서울",
                "street": "1",
                "zipcode": "1111"
            },
            "orderItems": [
                {
                    "itemName": "jpa1 book",
                    "orderPrice": 10000,
                    "count": 10000
                },
                {
                    "itemName": "jpa2 book",
                    "orderPrice": 20000,
                    "count": 20000
                }
            ]
        },
        {
            "orderId": 11,
            "name": "userB",
            "orderDate": "2021-06-23T17:15:43.888455",
            "orderStatus": "ORDER",
            "address": {
                "city": "진주",
                "street": "2",
                "zipcode": "2222"
            },
            "orderItems": [
                {
                    "itemName": "spring1 book",
                    "orderPrice": 10000,
                    "count": 10000
                },
                {
                    "itemName": "spring2 book",
                    "orderPrice": 20000,
                    "count": 20000
                }
            ]
        },
        {
            "orderId": 11,
            "name": "userB",
            "orderDate": "2021-06-23T17:15:43.888455",
            "orderStatus": "ORDER",
            "address": {
                "city": "진주",
                "street": "2",
                "zipcode": "2222"
            },
            "orderItems": [
                {
                    "itemName": "spring1 book",
                    "orderPrice": 10000,
                    "count": 10000
                },
                {
                    "itemName": "spring2 book",
                    "orderPrice": 20000,
                    "count": 20000
                }
            ]
        }
    ]
}
```

잘보면 같은 order가 반복해서 생성된걸 알수 있다. 
> db에서 join을 하면 일대다 컬렉션의 수에 맞춰서 order의 갯수도 정해진다. 여기서는 orderitem이 4개 이므로 order도 4개가 나온다. 

- 따라서 order의 중복을 없애줘야한다.
```java
 public List<Order> findAllWithItem() {
        return em.createQuery("select distinct o from Order o" +
                                     " join fetch o.member m" +
                                      " join fetch o.delivery d" +
                                      " join fetch o.orderItems oi" +
                                       " join fetch oi.item i", Order.class).getResultList();
    }
```
- select 뒤에 distinct를 붙여줬다.
```shell
{
    "data": [
        {
            "orderId": 4,
            "name": "userA",
            "orderDate": "2021-06-23T17:18:18.388797",
            "orderStatus": "ORDER",
            "address": {
                "city": "서울",
                "street": "1",
                "zipcode": "1111"
            },
            "orderItems": [
                {
                    "itemName": "jpa1 book",
                    "orderPrice": 10000,
                    "count": 10000
                },
                {
                    "itemName": "jpa2 book",
                    "orderPrice": 20000,
                    "count": 20000
                }
            ]
        },
        {
            "orderId": 11,
            "name": "userB",
            "orderDate": "2021-06-23T17:18:18.431611",
            "orderStatus": "ORDER",
            "address": {
                "city": "진주",
                "street": "2",
                "zipcode": "2222"
            },
            "orderItems": [
                {
                    "itemName": "spring1 book",
                    "orderPrice": 10000,
                    "count": 10000
                },
                {
                    "itemName": "spring2 book",
                    "orderPrice": 20000,
                    "count": 20000
                }
            ]
        }
    ]
}
```
> 결과를 보면 order중복이 없어진걸 알 수 있다. 

- distinct의 역할은 db에 distinct 쿼리를 쓰도록 하고, 만약 db에서 적용이 안되었다면 jpa가 알아서 id값이 같은 order를 중복제거 시켜준다. 

✔ 이러한 방식으로 컬렉션 조회를 최적화해보았다. 그러나 컬렉션이 있을때 fetch join 방식에서는 큰 단점이 하나 있다. 바로 페이징이 불가하다는 것이다. 페이징 기준이 컬렉션의 요소 수로 정해지기 때문에 order에 대한 정확한 페이징이 불가능하다. jpa는 일단 메모리에 모든요소를 다 올려놓고 페이징 시키는 방식을 적용하고 , 이는 OOM을 불러올수 있다. **또한** 컬렉션이 여러개 있을때는 fetch join 하면 안된다. 매우 복잡해진다. 
