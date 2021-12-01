# syntax=docker/dockerfile:1
FROM node:12-alpine

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3333
CMD npm run start
