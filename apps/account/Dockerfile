FROM node:15.14.0-slim

WORKDIR app
COPY package*.json ./
RUN npm ci --silent
COPY . .

ARG PORT=3000
ENV PORT=$PORT

EXPOSE $PORT

USER node

CMD ["npm", "run", "dev"]
