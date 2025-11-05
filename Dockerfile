# Stage 1: сборка
FROM node:22-alpine AS builder

WORKDIR /app

# Копируем зависимости
COPY package*.json ./
RUN npm ci --omit=dev

# Копируем исходники
COPY . .

# Собираем приложение
RUN npx nuxi build

# Stage 2: запуск
FROM node:22-alpine AS runner

WORKDIR /app

# Устанавливаем только production-зависимости
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts --no-audit --no-fund

# Копируем результат сборки
COPY --from=builder /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
