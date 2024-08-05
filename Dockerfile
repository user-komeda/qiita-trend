FROM ghcr.io/user-komeda/docker_node:sha-304b09e

RUN mkdir app

WORKDIR /app/

COPY ./package.json ./yarn.lock ./

COPY . .

RUN yarn install

CMD ["yarn","aaa"]
