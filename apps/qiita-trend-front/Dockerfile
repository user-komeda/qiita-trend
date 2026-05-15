FROM ghcr.io/user-komeda/docker_node:sha-0af7530@sha256:ede1e29ccff48c7fe157c876e1db7b59471c93bd572ce20fd98a9ab48efb04c8 AS base

FROM base AS builder
WORKDIR /app

RUN yarn global add turbo@2.9.12
COPY . .

RUN yarn turbo prune --scope=qiita-trend-front --docker


FROM base AS installer
WORKDIR /app

RUN microdnf install -y git openssh-clients && \
    microdnf clean all && \
    mkdir -p -m 0700 ~/.ssh && \
    ssh-keyscan github.com >> ~/.ssh/known_hosts

RUN corepack enable

COPY --from=builder /app/out/json/ ./

RUN --mount=type=ssh \
    GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=yes" \
    yarn install --immutable

COPY --from=builder /app/out/full/ ./

RUN yarn build


FROM base AS runner
WORKDIR /app

RUN groupadd appgroup && useradd -r -g appgroup appuser

COPY --from=installer /app/apps/qiita-trend-front/.next/standalone ./
COPY --from=installer /app/apps/qiita-trend-front/.next/static ./apps/qiita-trend-front/.next/static
COPY --from=installer /app/apps/qiita-trend-front/public ./apps/qiita-trend-front/public

COPY --from=installer /app/node_modules/infisicalLauncher/dist/index.cjs /app/infisicalLauncher.cjs

USER appuser
COPY .env* ./


CMD ["node", "/app/infisicalLauncher.cjs", "--path=/qiitaTrend/next", "--", "node", "./apps/qiita-trend-front/server.js"]