FROM node:alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY  . .
RUN npm run build && npm prune --production

# ---

FROM node:alpine

WORKDIR /app

COPY --from=builder /app .

#RUN npm run start:prod

CMD ["node", "dist/main.js"]
