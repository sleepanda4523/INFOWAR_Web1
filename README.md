# File Injection 
1. docker 설치
2. image pull
	`sudo docker pull sleepanda4523/injection`
3. docker-compose.yml 생성
```
version: '3.1'

services:
  file-injection: 
    image: sleepanda4523/injection 
    container_name: injection 
    ports: 
      - "3000:3000"
    restart: "always"
    network_mode: host
```
4. docker-compose 실행
  `docker-compose up -d`
5. docker 접속 및 로그 확인 부탁드립니다.
  `docker logs injection`