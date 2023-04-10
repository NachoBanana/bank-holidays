# Build golang
FROM golang:1.20-buster AS build

ARG GIN_MODE=release
WORKDIR /bank-holidays/api

COPY ./api ./

RUN go mod download
RUN go build -v -o /bank-holidays/bank-holidays

# Deploy
FROM gcr.io/distroless/base-debian11 AS deploy

WORKDIR /bank-holidays

COPY --from=build --chown=nonroot:nonroot /bank-holidays/bank-holidays ./bank-holidays
COPY --from=build --chown=nonroot:nonroot /bank-holidays/api/data/holidays.json ./data/holidays.json

USER nonroot:nonroot

ENTRYPOINT ["/bank-holidays/bank-holidays"]
