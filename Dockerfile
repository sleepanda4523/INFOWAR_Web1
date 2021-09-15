FROM node:14
# FROM ubuntu:18.04
# RUN apt-get update && apt-get install sudo -y
# RUN apt-get install -y curl
# RUN curl --silent --location https://deb.nodesource.com/setup_14.x | sudo bash -
# RUN apt-get install -y nodejs
# RUN npm install -g yarn

WORKDIR /root/CTF_WEB
COPY . .
RUN yarn install

WORKDIR /root/CTF_WEB/backed
RUN yarn install

WORKDIR /root/CTF_WEB/fronted
RUN yarn install

EXPOSE 3000

WORKDIR /root/CTF_WEB
# RUN apt install mysql-server-8.0 -y
# RUN chmod +x /root/CTF_WEB/setup.sh
# ENTRYPOINT ["sudo","/root/CTF_WEB/setup.sh"]
CMD ["yarn","dev"]