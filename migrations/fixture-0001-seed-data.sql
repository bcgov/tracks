create type organization_type as enum ('COMMERCIAL OPERATOR', 'GOVERNMENT');

create table organization
(
    id     bigint            not null primary key generated always as identity,
    name   varchar(255)      not null unique,
    active boolean           not null default true,
    type   organization_type not null default 'COMMERCIAL OPERATOR'
);

create table user_mapping
(
    sub          varchar(64) not null primary key,
    organization bigint      not null references organization (id) on delete restrict on update restrict
);

create type travel_path_processing_state as enum ('NEW', 'PROCESSING', 'READY', 'FAILED');

create table travel_path
(
    id               bigint                       not null primary key generated always as identity,
    processing_state travel_path_processing_state not null default 'NEW',
    created_at       timestamp without time zone  not null default now(),
    start_time       timestamp without time zone  null,
    gpx_file_data    bytea                        null,
    geometry         geography(MULTILINESTRING)   null,
    organization     bigint                       not null references organization (id) on delete restrict on update restrict,
    "user"           varchar(64)                  not null references user_mapping (sub) on delete restrict on update cascade
);
