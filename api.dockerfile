FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY domain ./domain
COPY apps/backend ./apps/backend
COPY tsconfig.json ./tsconfig.json

RUN npm install --prefix ./domain
RUN npm install --prefix ./apps/backend

RUN npm run build --prefix ./domain

EXPOSE 3000

CMD ["npm", "run", "start", "--prefix", "./apps/backend"]
