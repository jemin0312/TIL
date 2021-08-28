1. 타입스크립트 설치
- npm -g typescript ts-node
타입스크립트와 ts-node 설치

2. 설정파일 생성
- tsc --init
tsconfig.json파일 자동생성 아래설정 주석해제 경로설정

"outDir": "./build", <-- 컴파일된 ts파일 경로
"rootDir": "./src", <-- ts소스파일 경로
3. npm 프로젝트 생성
1. npm init
2. nodemon, concurrently 모듈설치
3.  "start:build": "tsc -w",  <-- ts파일 빌드 및 빌드내용 보기
    "start:run": "nodemon build/index.js", <-- 빌드된 파일 실행
    "start": "concurrently npm:start:*" <-- build, run 동시 실행
4. 실행
npm start
