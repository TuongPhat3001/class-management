# Stage 1: Build ứng dụng
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Phục vụ file tĩnh bằng Nginx
FROM nginx:alpine
# Copy các file đã build từ stage 1 sang thư mục của Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port 80 bên trong container
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]