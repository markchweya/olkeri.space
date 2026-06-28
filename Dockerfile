FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY mcp-server ./mcp-server

ENV NODE_ENV=production

EXPOSE 8787

CMD ["npm", "run", "mcp:server"]
