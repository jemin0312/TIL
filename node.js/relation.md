```javascript
const result = await User.findOne({username : 'jemjem'})
    const result2 = await result.getComments(); // 연관관계가 있는 녀석 가져오는 조건 
중요! post로 데이터 넣어줄때 foreignKey인 commenter에도 user의 id값을 넣어줘야 연관관계가 성립이 되서 조회 가능하다. 
```
