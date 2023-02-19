FROM node as build

ENV HOST_BACKEND=HOST_BACKEND
ENV PORT_BACKEND=PORT_BACKEND

WORKDIR /app

COPY ./ /app

RUN npm install
RUN npm run build

FROM nginx as deploy

WORKDIR /app

COPY --from=build /app/dist /app
COPY ./nginx.conf /etc/nginx/nginx.conf
