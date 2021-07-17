## 자동 매크로 등록하기 

```shell
ctrl + shift + p
```
명령 팔레트로 진입한다. 
```shell
snippset
```
사용자 코드 조각 구성으로 진입한 후, javascript를 선택 
```json
"Express Callback": {
		"prefix": "rr",
		"body": [
			"(req,res,next) => {$1}"
		],
		"description": "Express Callback"
	}
```
javascript.json에 해당 형식으로 추가한다.<br/>
prefix에 설정한 값이 단축키가 된다. 

