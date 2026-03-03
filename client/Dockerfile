# ============================================
# Build the Vite/React application
# ============================================
FROM node:22-bookworm-slim AS builder

WORKDIR /app

# Copy dependency manifests first (layer-caching optimisation)
COPY package.json package-lock.json ./

# Install ALL dependencies (dev deps are needed for the build)
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the production bundle → outputs to /app/dist
RUN npm run build

