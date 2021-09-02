FROM node:14

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
# RUN sudo apt purge mysql-server mysql-client mysql-common
# RUN apt install mysql-server-8.0 -y
# RUN chmod +x /root/CTF_WEB/setup.sh
# ENTRYPOINT ["sudo","/root/CTF_WEB/setup.sh"]
CMD ["yarn","dev"]