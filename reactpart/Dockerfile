FROM node:latest as node

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install


CMD ["npm", "start"]