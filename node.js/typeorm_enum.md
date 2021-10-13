```javascript
export type AnimalRole = 'cat' | 'dog' | 'tiger' ; 

@Column({
        type : 'enum',
        enum : ['cat','dog','tiger'],
        default : "cat"
    })
     role?: AnimalRole 

```
