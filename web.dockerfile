FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY domain ./domain
COPY apps/frontend ./apps/frontend
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.base.json ./tsconfig.base.json


RUN npm install -g npm@latest
RUN npm install --prefix ./domain
RUN npm install --prefix ./apps/frontend

RUN npm run build --prefix ./domain

EXPOSE 5173

CMD ["npm", "run", "dev", "--prefix", "./apps/frontend", "--", "--host", "0.0.0.0", "--port", "5173"]
