FROM node:latest

WORKDIR /usr/src/app

COPY /package.json /usr/src/app
COPY /package-lock.json /usr/src/app

RUN npm i --trace-deprecation

COPY . /usr/src/app
EXPOSE 3200

CMD ["npm", "run", "server"]
