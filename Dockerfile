FROM node:12

WORKDIR /usr/api-rest
COPY package.json .
RUN npm install

COPY . .

CMD npm start