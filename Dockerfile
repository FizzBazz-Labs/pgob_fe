FROM node:20-alpine3.17

WORKDIR /etc/pgob_fe/code

COPY . /etc/pgob_fe/code

RUN npm i

EXPOSE 5173

CMD ["npm", "run", "dev"]
