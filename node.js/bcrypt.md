### bcrypt 
DB에 사용자의 password를 저장할때, 날것 그대로 저장하면 보안상 해킹의 위험이 크다
<br>
node에서는 bcrypt 라이브러리를 사용해서 password를 해싱해서 암호화 시킨 뒤 저장한다. 
```javascript
npm i bcrypt
```
bcrypt 라이브러리를 설치한다 
```javascript
const password = 'abcd1234';
const hashed = bcrypt.hashSync(password,10);
```
hashSync의 매개변수 중 2번째 인자는 salt의 자릿수를 의미한다.
<br>
✔ salt : 해싱을 할때 복잡도를 추가해주는 허수를 말한다. 
```shell
$2b$ : 사용한 알고리즘, 10$ : salt의 자릿수, lRjST5kIbz : salt, 3tpDD/GOVTme.Z.U1ED0ikPK64Wl3WUlLY6MD5C6M9u : hash
```
❗ salt의 길이를 늘릴수록 hashing에 필요한 시간은 기하급수적으로 증가한다. 적당한 길이를 설정해야한다. 

### bcrypt와 원래 비밀번호 체크 
```javascript
const result = bcrypt.compare('비밀번호','해시된 비밀번호');
```
