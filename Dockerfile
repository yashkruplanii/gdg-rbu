# Production Dockerfile for GDG RBU EventHub
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci

# Copy application source
COPY . .

# Generate Prisma Client & Build
RUN npx prisma generate
RUN npm run build

# Expose Next.js port
EXPOSE 3000

ENV PORT 3000
ENV NODE_ENV production

CMD ["npm", "start"]
