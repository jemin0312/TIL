### postgres 기본 단축키 
```sql

psql -U postgres   // psql shell을 시작하는 명렁어

\q    // psql 종료 
\ㅣ   // 데이터베이스 조회 
\c    // 선택한 DB로 이동 
\dt   // 현재 데이터베이스에서 테이블 확인 
\e    // 외부 텍스트 에디터 열기 
```

### SQL 쿼리 
```sql
CREATE DATABASE book_store;   // DB 생성 

DROP DATABASE book_store;     // DB 삭제 

CREATE TABLE develop_book (   // TABLE 생성
book_id INTEGER, 
name VARCHAR(80)
);

DROP TABLE develop_book       // TABLE 삭제 

INSERT INTO develop_book VALUES (1,'value1','value2');   // 데이터 생성 

INSERT INTO develop_book ('컬럼1','컬럼2') VALUES ('값1','값2'); // 원하는 컬럼 선택후 데이터 생성 


```
