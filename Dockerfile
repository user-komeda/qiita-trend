FROM ghcr.io/user-komeda/docker_node:sha-304b09e@sha256:cae366f377ce91cfc4a8fab9a64a28e80d0fad90d4aa0413e392700bb3d3a5d0

RUN mkdir app

WORKDIR /app/

COPY ./package.json ./yarn.lock ./

COPY . .

RUN yarn install

CMD ["yarn","dev"]
