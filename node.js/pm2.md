### pm2 작동법
```shell
# Fork mode
pm2 start app.js --name my-api # Name process

# Cluster mode
pm2 start app.js -i 0        # Will start maximum processes with LB depending on available CPUs
pm2 start app.js -i max      # Same as above, but deprecated.
pm2 scale app +3             # Scales `app` up by 3 workers
pm2 scale app 2              # Scales `app` up or down to 2 workers total

# Listing

pm2 list               # Display all processes status
pm2 jlist              # Print process list in raw JSON
pm2 prettylist         # Print process list in beautified JSON

pm2 describe 0         # Display all informations about a specific process

pm2 monit              # Monitor all processes

# Logs

pm2 logs [--raw]       # Display all processes logs in streaming
pm2 flush              # Empty all log files
pm2 reloadLogs         # Reload all logs

# Actions

pm2 stop all           # Stop all processes
pm2 restart all        # Restart all processes

pm2 reload all         # Will 0s downtime reload (for NETWORKED apps)

pm2 stop 0             # Stop specific process id
pm2 restart 0          # Restart specific process id

pm2 delete 0           # Will remove process from pm2 list
pm2 delete all         # Will remove all processes from pm2 list

# Misc

pm2 reset <process>    # Reset meta data (restarted time...)
pm2 updatePM2          # Update in memory pm2
pm2 ping               # Ensure pm2 daemon has been launched
pm2 sendSignal SIGUSR2 my-app # Send system signal to script
pm2 start app.js --no-daemon
pm2 start app.js --no-vizion
pm2 start app.js --no-autorestart
```
pm2 => 프로세스 매니져 
프로그램을 체계적으로 관리해주는 프로그램

프로세스 : 프로그램이 실행되서 메모리에 올라가있으면 프로세스라고 한다. 

pm2 사용시 효용 
애플리케이션이 의도치 않은 사고로 꺼질 수 있다. 우리는 알아차리는데 시간 걸린다. pm2는 프로세스가 꺼지면 자동으로 재활성화 

pm2 start app.js : pm2를 이용해서 app.js를 프로세스로 만들었고 백그라운드에서 돌아가기 때문에 우리는 다시 명령어를 칠 수 있다. 

결론 : 프로세스 꺼져도 살려준다. 

이제 프로세스 다시 시작하는 법 

pm2의 효용 

코드가 변경 되었을때 프로세스를 재실행 하지 않으면 자동으로 반영되지 않는다. 

pm2 start app.js --watch 해주면 코드 변경 시 자동으로 프로세스를 껐다가 켜준다. 

명령어 정리 : 
pm2 start app.js : 시작 
pm2 stop 0 : 0번 프로세스 정지 
pm2 ls : 프로세스의 코드가 변화하면 자동으로 프로세스 재시작 
pm2-dev app.js :  로그도 찍어주고 watch기능도 해줌 
pm2 --watch : 변경 감지 
pm2 log : 로그 찍기 

노드 js 싱글 쓰레드

pm2 start app.js -i max 
쓰레드의 숫자만큼 프로세스 실행 
사용자들이 많을때 각각의 쓰레드를 사용해서 처리 
동시 작업에 유리 

컴퓨터가 꺼졌다가 켜졌을때 프로세스 다시 켜줌 
pm2 save 현재 프로세스 상태를 저장 

