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

# ============================================
# Serve with Nginx
# ============================================
FROM nginx:1.27-alpine

# Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy the built static files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config (created in Commit 3)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx listens on
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]