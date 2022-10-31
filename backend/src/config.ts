// global configuration goes here

import dotenv from "dotenv";

dotenv.config();

const CONFIG = {

    LISTEN_PORT: 6005,

    IS_PROD: process.env.NODE_ENV === 'production',
    DEVELOPMENT_MODE: true,

    TRACKS_DB_NAME: process.env.TRACKS_DB_NAME,
    TRACKS_DB_USER: process.env.TRACKS_DB_USER,
    TRACKS_DB_PASSWORD: process.env.TRACKS_DB_PASSWORD,
    TRACKS_DB_HOST: process.env.TRACKS_DB_HOST,
    TRACKS_DB_PORT: parseInt(process.env.TRACKS_DB_PORT),

    JWKS_URL: process.env.JWKS_URL,

    LOGINPROXY_URL: process.env.LOGINPROXY_URL,
    LOGINPROXY_TOKEN_URL: process.env.LOGINPROXY_TOKEN_URL,
    LOGINPROXY_SA: process.env.LOGINPROXY_SA,
    LOGINPROXY_SA_SECRET: process.env.LOGINPROXY_SA_SECRET,
    LOGINPROXY_ENVIRONMENT: process.env.LOGINPROXY_ENVIRONMENT,
    LOGINPROXY_INTEGRATION: process.env.LOGINPROXY_INTEGRATION,

    RABBIT_MQ_HOST: process.env.RABBIT_MQ_HOST,
    RABBIT_MQ_VHOST: process.env.RABBIT_MQ_VHOST,
    RABBIT_MQ_USER: process.env.RABBIT_MQ_USER,
    RABBIT_MQ_PASSWORD: process.env.RABBIT_MQ_PASSWORD,

    // we need a way to talk to minio directly, and also a URL to pass to the client
    // they could be different while running in k8s/os
    MINIO_HOST: process.env.MINIO_HOST,
    MINIO_PORT: process.env.MINIO_PORT,
    MINIO_USE_SSL: process.env.MINIO_USE_SSL,

    // values from docker-compose file. for local testing only.
    MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
    MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,

    SMTP_ENABLED: process.env.SMTP_ENABLED === 'true' || false,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_MAIL_FROM: process.env.SMTP_MAIL_FROM,
    SMTP_USERNAME: process.env.SMTP_MAIL_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,

    TANTALIS_USERNAME: process.env.TANTALIS_USERNAME,
    TANTALIS_PASSWORD: process.env.TANTALIS_PASSWORD,
    TANTALIS_API_BASE: process.env.TANTALIS_API_BASE,
    TANTALIS_OAUTH_BASE: process.env.TANTALIS_OAUTH_BASE

};

export {CONFIG};
