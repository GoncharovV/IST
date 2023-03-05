FROM node:12.13-alpine

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
