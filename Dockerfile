FROM docker.io/node:lts-alpine

WORKDIR /home/node/app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start" ]