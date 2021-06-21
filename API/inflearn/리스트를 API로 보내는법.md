### API로 엔티티 리스트를 반환하고 싶을때 
_김영한님의 강의를 참조하였습니다._
>1. 엔티티 리스트를 그대로 반환했을때 

```java
  @GetMapping("/api/v1/memberlist")
   public List<Member> memberList()
   {
       return memberService.findMembers();
   }
```
-> 응답 json
```shell
[
    {
        "id": 1,
        "name": "fasdf",
        "address": {
            "city": "fsdf",
            "street": "sdf",
            "zipcode": "dsafsa"
        },
        "orders": []
    }
]
```

- json 데이터 형식을 보면 가장 외부가 리스트로 감싸져 있는 것을 알 수 있다.
- 예를 들어 응답 데이터에 university라는 필드를 추가 하고 싶어도 유연하게 추가할수가 없다. 
- 엔티티 자체를 반환했기 때문에 api 스펙에서 원하지 않는 필드값들도 전달된다.

> 2. 엔티티를 dto로 변환하고 리스트 자체를 컬렉션으로 한번 더 감쌌을때

```java
static class Result<T>{
       private T data;
   }
```

- 리스트 자체를 제네릭 타입으로 한번 감싸준다. 

```java
List<Member> members = memberService.findMembers();
       members.stream().map(m -> new MemberDto(m.getName())).collect(Collectors.toList());
```

- stream()을 이용해서 member 리스트를 memberDto 리스트로 변환해준다. 

```java
return new Result("memberDto 리스트");
```

- 마지막에 제네릭으로 감싸서 반환해준다. 

```shell
{
    "data": [
        {
            "name": "제민"
        },
        {
            "name": "a"
        }
    ]
}
```

> 결과적으로 API 스펙에 맞춰서 원하는 필드 값들만 전송할수 있고, "data" 필드 외에
다른 필드도 유연하게 추가할 수 있다. 

😊 DTO의 핵심! 엔티티를 직접 노출 시키지 않아도 되고 'API 스펙에 맞는 원하는 값만 받고 원하는 값만 응답할 수 있다'. 명확성이 확 올라감!!  
> 제네릭타입을 써서 받는 이유에 대한 생각 : 제네릭 타입으로 받아야 다른 API에서 원하는 리스트를 반환할때 재활용할 수 있기 때문이라 
