# for use in skaffold build/deploy

FROM gradle:7.0-jdk11

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY . .

ENTRYPOINT ./run_migration.sh

