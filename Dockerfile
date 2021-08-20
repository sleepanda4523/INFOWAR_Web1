FROM node:14
WORKDIR /CTF_WEB
COPY . .
RUN yarn install

WORKDIR /CTF_WEB/backed
RUN yarn install

WORKDIR /CTF_WEB/fronted
RUN yarn install

EXPOSE 3000

WORKDIR /CTF_WEB
CMD ["yarn","dev"]