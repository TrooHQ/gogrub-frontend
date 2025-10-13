# syntax=docker/dockerfile:1.6

############################
# Build stage
############################
FROM node:22-alpine AS builder
WORKDIR /app

# Increase V8 heap limit (4 GB)
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install deps with cache
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/root/.cache/yarn \
    yarn install --frozen-lockfile

# Copy sources and build
COPY . .
RUN yarn build    # ensure package.json -> "build": "vite build"

############################
# Runtime stage
############################
FROM node:22-alpine
WORKDIR /app

RUN npm i -g serve@14

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
