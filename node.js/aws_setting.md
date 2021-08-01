이고잉님 자료 참고 

# linux에서 nodejs를 80번 포트에서 실행하기 
80번 포트는 root 권한으로만 실행이 가능하기 때문에 보안적으로 좋은 방법은 아닙니다. 
```bash 
sudo apt update;
sudo apt install -y nodejs npm; 
echo "var http = require('http');
var app = http.createServer(function(req, res){
	res.end('hi');
});
app.listen(80);" > index.js;
sudo npm install --global pm2; 
sudo pm2 start index.js;
sudo pm2 save;
sudo pm2 startup;
```
# node를 8000번 포트로 실행하기
http의 기본 포트는 80번이기 때문에 주소에 포트를 넣어줘야 합니다. http://myip:8000/
```bash 
sudo pm2 unstartup systemd;
echo "var http = require('http');
var app = http.createServer(function(req, res){
	res.end('hi');
});
app.listen(8000);" > index.js;
pm2 start index.js;
pm2 save;
pm2 startup; # script copy/paste 실행
```

# iptables
```bash 
sudo iptables -A PREROUTING -t nat -i eth0 	-p tcp --dport 80 -j REDIRECT --to-port 8000;
sudo iptables -t nat -L;
sudo apt install iptables-persistent; # yes
sudo bash -c "iptables-save > /etc/iptables/rules.v4";
sudo bash -c "iptables-restore < /etc/iptables.conf"; startup script에 등록
