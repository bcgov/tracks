# for use in skaffold build/deploy

FROM golang:1.16-alpine

WORKDIR /go/src/app
COPY src/go.mod .
COPY src/go.sum .
RUN go mod download
COPY src/ .

RUN go get -d -v ./...
RUN CGO_ENABLED=0 GOOS=linux go build -a -o exporter .

ENTRYPOINT ./exporter
