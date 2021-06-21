### DTO를 통한 업데이트 API

> POST 매핑? 아니면 PUT 매핑?

- RESTFUL api 상 단건 업데이트는 {id} 식의 단일 식별자를 사용하므로 PUT으로 쓰는게 맞다

```java
@Transaction
public void update(Long id, String name)
{
    Member A = memberRepository.findOne(id) // 트렌젝션 내부에서 엔티티를 가져옴
    A.setName(name) // 단순히 set을 통해서 필드값 변경
    
    # controller에서 다시 find를 통해 Member 찾아와서 DTO에 값 세팅해주기  
}
```
> 트렌젝션이 끝날때 알아서 변경감지(더티체킹)이 되므로 업데이트가 정상 실행된다. 

```java
@PutMapping("/api/cats/{catId}")
 public UpdateResponseDTO updateCat(@PathVariable Long catId, @RequestBody UpdateRequestDTO updateRequestDTO)
    {
        catRepository.update(catId, updateRequestDTO.getName());
        Cat cat = catRepository.findOne(catId);
        return new UpdateResponseDTO(cat.getName);
        
    }
```
