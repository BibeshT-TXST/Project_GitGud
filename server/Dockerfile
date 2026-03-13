FROM node:22-bookworm-slim AS builder

WORKDIR /app

# Copy dependency manifests first (layer-caching optimisation)
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci 

# Runtime
FROM node:22-bookworm-slim

WORKDIR /app

# Copy installed node_modules from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy application source code
COPY . .

# The port the Express server listens on
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]