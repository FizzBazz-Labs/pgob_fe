FROM node:20-alpine3.17

WORKDIR /etc/pgob_fe/code

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev:docker"]
