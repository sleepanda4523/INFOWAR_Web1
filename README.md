# File Injection 
## docker 실행
1. 일단 docker와 docker-compose 설치
2. mysql image를 pull한다.
	`sudo docker pull mysql` 
3. 문제 파일 도커를 pull한다.
	`sudo docker pull sleepanda4523/file-injection` 
4. docker-compose.yml을 작성한다.
```
version: '3.1'

services:
  mysql:
    image: mysql
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    container_name: mysql
    network_mode: host
    environment:
      MYSQL_ROOT_PASSWORD: ctfadmin1234
      MYSQL_DATABASE: ctfweb
    

  file-injection: 
    image: sleepanda4523/file-injection 
    container_name: file-injection 
    ports: 
      - "3000:3000"
    restart: "always"
    network_mode: host

```
5. image를 빌드한다.
```docker-compose up -d --build```
6. http://localhost:3000에 잘 접속되는지 확인바람.
### 만약 docker image로 안될 시
1. docker와 docker-compose 설치한다.
2. mysql image를 pull한다.
	`sudo docker pull mysql` 
3. git clone 한다.
`git clone https://github.com/sleepanda4523/CTF_WEB.git`
4. /CTF_WEB 폴더에서 이미지 빌드를 시킨다.
`sudo docker build -t sleepanda4523/file-injection .`
5. docker-compose 빌드
`sudo docker-compose up -d`