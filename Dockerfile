# Etapa de construcción
FROM node:18-alpine as builder

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

RUN npm run build

# Verifica si se generó la carpeta (solo para debug, puedes quitar después)
RUN ls -la /app/frontend/dist/angular-web/browser

# Etapa de producción
FROM nginx:alpine

COPY --from=builder /app/frontend/dist/angular-web/browser /usr/share/nginx/html
COPY frontend/nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
