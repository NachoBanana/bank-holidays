ARG HOST_BACKEND
ARG PORT_BACKEND

FROM node as build

WORKDIR /app

COPY ./ /app

RUN npm install
RUN npm run build

FROM nginx as deploy

WORKDIR /app

COPY --from=build /app/dist /app
COPY ./nginx.conf /etc/nginx/nginx.conf
