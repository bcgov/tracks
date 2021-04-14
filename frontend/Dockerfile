# for use in skaffold build/deploy

FROM node:lts-alpine
EXPOSE 5001

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package.json .
RUN npm install
COPY . .
RUN npm run build

