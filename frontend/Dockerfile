FROM node:14.4.0-alpine3.10

ARG WORKDIR
ARG CONTAINER_PORT

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install

COPY . ${WORKDIR}
