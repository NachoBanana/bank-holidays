# Build npm
FROM node as build_npm

WORKDIR /bank-holidays/app

COPY ./app /bank-holidays/app

RUN npm ci
RUN npm run build

# Build golang
FROM golang:1.20-buster AS build_go

ARG GIN_MODE=release
WORKDIR /bank-holidays/api

COPY ./api ./

RUN go mod download
RUN go build -v -o /bank-holidays/bank-holidays

# Deploy
# FROM gcr.io/distroless/base-debian11 AS deploy
FROM debian:stable-slim AS deploy

WORKDIR /bank-holidays

COPY --from=build_npm --chown=nonroot:nonroot /bank-holidays/app/dist ./dist
COPY --from=build_go --chown=nonroot:nonroot /bank-holidays/bank-holidays ./bank-holidays
COPY --from=build_go --chown=nonroot:nonroot /bank-holidays/api/data/holidays.json ./data/holidays.json

USER nonroot:nonroot

# ENTRYPOINT ["/bank-holidays/bank-holidays"]
CMD ["/bank-holidays/bank-holidays"]
