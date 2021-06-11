// global configuration goes here

const CONFIG = {

  LISTEN_PORT: 6005,

  IS_PROD: process.env.NODE_ENV === 'production',
  DEVELOPMENT_MODE: true,

  TRACKS_DB_NAME: process.env.TRACKS_DB_NAME || 'tracks',
  TRACKS_DB_USER: process.env.TRACKS_DB_USER || 'tracks',
  TRACKS_DB_PASSWORD: process.env.TRACKS_DB_PASSWORD || 'development_only',
  TRACKS_DB_HOST: process.env.TRACKS_DB_HOST || 'localhost',
  TRACKS_DB_PORT: parseInt(process.env.TRACKS_DB_PORT) || 5432,

  JWKS_URL: process.env.JWKS_URL || 'http://localhost:8888/auth/realms/tracks/protocol/openid-connect/certs',


  KEYCLOAK_BASE_URL: process.env.KEYCLOAK_BASE_URL || 'http://localhost:8888',
  KEYCLOAK_REALM: process.env.KEYCLOAK_REALM || 'tracks',
  KEYCLOAK_CLIENT: process.env.KEYCLOAK_CLIENT || 'tracks-ui',
  KEYCLOAK_SA: process.env.KEYCLOAK_SA,
  KEYCLOAK_SA_SECRET: process.env.KEYCLOAK_SA_SECRET,

  RABBIT_MQ_HOST: process.env.RABBIT_MQ_HOST || 'localhost',
  RABBIT_MQ_VHOST: process.env.RABBIT_MQ_VHOST || 'tracks',
  RABBIT_MQ_USER: process.env.RABBIT_MQ_USER || 'rabbitmq',
  RABBIT_MQ_PASSWORD: process.env.RABBIT_MQ_PASSWORD || 'rabbitmq',

  // we need a way to talk to minio directly, and also a URL to pass to the client
  // they could be different while running in k8s/os
  MINIO_HOST: process.env.MINIO_HOST || 'localhost',
  MINIO_PORT: process.env.MINIO_PORT || '9000',
  MINIO_USE_SSL: process.env.MINIO_USE_SSL || 'false',

  // values from docker-compose file. for local testing only.
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY || 'ccfc0d5a7a8f589ed8bc65b50a255d64',
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY || '7f99fccf96804f9456f05ad8bf926dba',

  SMTP_ENABLED: process.env.SMTP_ENABLED === 'true' || false,
  SMTP_HOST: process.env.SMTP_HOST || 'localhost',
  SMTP_PORT: process.env.SMTP_PORT || '587',
  SMTP_MAIL_FROM: process.env.SMTP_MAIL_FROM || 'tracks@gov.bc.ca',
  SMTP_USERNAME: process.env.SMTP_MAIL_FROM || '',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',

  TANTALIS_USERNAME: process.env.TANTALIS_USERNAME || 'unset',
  TANTALIS_PASSWORD: process.env.TANTALIS_PASSWORD || 'unset'

};

export {CONFIG};
