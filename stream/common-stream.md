> map이란?

- 리스트를 받아서 리스트 안의 요소들의 변경한 후 다시 스트림으로 변환해주는 것이다. 
- 특정 컬렉션의 요소들을 하나씩 뽑아내서 조작을 가한 후 새로운 컬렉션에 집어넣고 싶을때 주로 사용한다. 
```java
 List<String> list = new ArrayList<>();
        list.add("jemin");
        list.add("jiwon");
        list.add("jewon");
        List<String> collect = list.stream().map(l -> l.toUpperCase()).collect(Collectors.toList());
```
- 결과값
```shell
collect = [JEMIN, JIWON, JEWON]
```

>filter란? 

- 리스트 내부의 요소들에 필터를 걸어서 원하는 값만 스트림으로 빼내는 것이다. 
```java
 List<String> e = list.stream().filter(l -> l.contains("e")).collect(Collectors.toList());
```
- 결과값
```shell
e = [jemin, jewon]
```
