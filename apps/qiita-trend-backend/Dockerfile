FROM ghcr.io/user-komeda/docker_node:sha-fefe12b@sha256:bf92ea16fd95f3d02a1726f2c10cec618af4f0d0a67b2ea02c1dcd8f350a971e AS base

FROM base AS builder
WORKDIR /app
RUN yarn global add turbo@2.9.12
COPY . .
RUN turbo prune --scope=qiita-trend-backend --docker

FROM base AS installer
WORKDIR /app

RUN microdnf install -y git openssh-clients && \
    microdnf clean all && \
    mkdir -p -m 0700 ~/.ssh && \
    ssh-keyscan github.com >> ~/.ssh/known_hosts

COPY --from=builder /app/out/json/ ./

RUN corepack enable

RUN --mount=type=ssh \
    GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=yes" \
    yarn install --immutable

COPY --from=builder /app/out/full/ ./

RUN yarn build


FROM base AS runner
WORKDIR /app

RUN corepack enable && \
    groupadd appgroup && \
    useradd -r -g appgroup appuser

USER appuser

COPY --from=installer /app/apps/qiita-trend-backend/package.json /app/package.json
COPY --from=installer /app/node_modules/ /app/node_modules/
COPY --from=installer /app/apps/qiita-trend-backend/dist/ /app/dist/

COPY .env* ./


CMD ["node", "./node_modules/infisicalLauncher/dist/index.cjs", "--path=/qiitaTrend/nest", "--", "node", "dist/main.js"]