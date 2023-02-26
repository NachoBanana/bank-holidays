FROM golang:1.19.5-alpine

WORKDIR /app

COPY ./ /app/
RUN go mod download

RUN go build -o /bank-holiday-be

CMD [ "/bank-holiday-be" ]
