FROM node as build

ARG HOST_BACKEND
ARG PORT_BACKEND

WORKDIR /app

COPY ./ /app

# Development build
RUN echo "VUE_APP_HOST_BACKEND=${HOST_BACKEND}" >> ./.env
RUN echo "VUE_APP_PORT_BACKEND=${PORT_BACKEND}" >> ./.env

# Production build
RUN echo "VUE_APP_HOST_BACKEND=${HOST_BACKEND}" >> ./.env.production
RUN echo "VUE_APP_PORT_BACKEND=${PORT_BACKEND}" >> ./.env.production

RUN npm install
RUN npm run build

FROM nginx as deploy

WORKDIR /app

COPY --from=build /app/dist /app
COPY ./nginx.conf /etc/nginx/nginx.conf
