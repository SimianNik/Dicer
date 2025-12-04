# -------- BUILD STAGE --------
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the source and build
COPY . .
RUN npm run build


# -------- RUNTIME STAGE (NGINX) --------
FROM nginx:alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy Vite build output to nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom nginx config (for React Router SPA)
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
