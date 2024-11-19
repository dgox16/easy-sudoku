FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN pnpm build

FROM caddy:2-alpine

COPY --from=builder /app/dist /srv

COPY Caddyfile /etc/caddy/Caddyfile