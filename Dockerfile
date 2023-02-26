FROM golang:1.20-buster

WORKDIR /bank-holiday

COPY ./api ./
RUN go mod download

RUN go build -o /bank-holiday-be

CMD [ "/bank-holiday-be" ]
