# Base stage
FROM node:20.12.2-alpine3.18 AS base
WORKDIR /app

# Install dependencies stage
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Production-only dependencies stage
FROM base AS production-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY . .
RUN npm run build

# Production stage
FROM base AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
EXPOSE 3333
CMD ["node", "./build/bin/server.js"]