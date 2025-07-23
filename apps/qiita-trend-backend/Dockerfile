FROM ghcr.io/user-komeda/docker_node:sha-0af7530@sha256:ede1e29ccff48c7fe157c876e1db7b59471c93bd572ce20fd98a9ab48efb04c8 AS base

FROM base AS builder
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=qiita-trend-backend --docker



FROM base AS installer
WORKDIR /app/
COPY --from=builder /app/out/json/ .
RUN corepack enable
RUN corepack install -g yarn@stable 
RUN yarn install
COPY --from=builder /app/out/full/ .
RUN yarn build



FROM base AS runner
WORKDIR /app/
RUN corepack enable
RUN corepack install -g yarn@stable 
RUN groupadd appgroup && useradd -r -g appgroup appuser
USER appuser
COPY --from=installer /app/apps/qiita-trend-backend/package.json /app/
COPY --from=installer  /app/node_modules/ /app/node_modules/
COPY --from=installer /app/apps/qiita-trend-backend/dist/ /app/dist/
CMD ["node", "dist/main.js"]
