```javascript
// 1. shorthand properties

const name = 'jemin'
const age = 24

const jemin = {
  name,
  age
}

console.log(jemin) // {name : 'jemin' , age : 24}

// 2. destructing assignment

const jiwon = {
  name1 : "jiwon",
  age1 : 23,
  univ : 'hanyang'
}

const {name1,age1} = jiwon
console.log(name1,age1); // jiwon 23

// 3. spread syntax

const student1 = {
   score : 100 , 
   pass : 'no'
}

const student2 = {...student1, hello : 'yes'}
console.log(student2) // ...안에 있는 객체나 배열의 각각의 값을 모두 복사해준다
// student1을 깊은 복사를 한건 아니고, 참조값만 복사해준것




// Ternary Operator 

let isPage = true

console.log(isPage ? 'hi' : 'hello')


// Nullish Coalescing Operator 
const name2 = null;

const username = name2 ?? 'jemin'


```
