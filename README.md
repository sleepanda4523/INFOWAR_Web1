# File Injection 
1. docker 설치
2. image pull
	`sudo docker pull sleepanda4523/injection`
  `sudo docker pull mysql`
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
  
    
  mysql:
    image: mysql
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    container_name: mysql
    network_mode: host
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_USER: ctfadmin
      MYSQL_PASSWORD: ctfadmin1234
      MYSQL_DATABASE: ctfweb
```
4. docker-compose 실행
  `docker-compose up -d`
5. docker 접속 및 로그 확인 부탁드립니다.
  `docker logs injection`
------------------------------------  
## 만약 docker hub에서 받은 image에 에러가 있을 경우
1. git clone
	`git clone https://github.com/sleepanda4523/CTF_WEB.git`
2. cd CTF_WEB 후 docker build
	```
	cd CTF_WEB
	docker build -t sleepanda4523/injection .
	```
3. docker-compose 실행
	`docker-compose up -d`
