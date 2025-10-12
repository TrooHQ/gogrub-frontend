# syntax=docker/dockerfile:1.6

############################
# Build stage
############################
FROM node:20-alpine AS builder
WORKDIR /app

# Give Node more heap (4 GB). Tweak if needed.
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Faster installs with cached deps:
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/root/.cache/yarn \
    yarn install --frozen-lockfile

# Copy the rest and build
COPY . .

# IMPORTANT: keep Docker build light — only run vite here.
# Move/keep type checking in CI:
#   package.json -> "build": "vite build"
RUN yarn build

############################
# Runtime stage
############################
FROM node:20-alpine
WORKDIR /app

# Tiny static server
RUN npm i -g serve@14

# Copy built assets only
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
