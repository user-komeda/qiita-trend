FROM ghcr.io/user-komeda/docker_node:sha-1ddfa53@sha256:05a225a40a2ea7fbdbbbb3fb8f0dd804d88ed695fa9431af94f5b267ea21ea90

WORKDIR /app/

COPY ./package.json ./yarn.lock ./

COPY . .

RUN yarn install

RUN yarn build

CMD ["yarn","start"]
