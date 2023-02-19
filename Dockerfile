FROM node as build

ARG HOST_BACKEND
ARG PORT_BACKEND

WORKDIR /app

COPY ./ /app

RUN npm install
RUN npm run build

FROM nginx as deploy

WORKDIR /app

COPY --from=build /app/dist /app
COPY ./nginx.conf /etc/nginx/nginx.conf
