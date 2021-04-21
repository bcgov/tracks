create type export_request_status as enum ('PENDING', 'PROCESSING', 'READY', 'ERROR');

create table export_request
(
    id               bigint                      not null primary key generated always as identity,
    created          timestamp without time zone not null default now(),
    status           export_request_status       not null default 'PENDING',
    user_sub         varchar(64)                 not null references user_mapping (sub) on delete restrict on update cascade,
    minio_identifier varchar(64)                 not null
);

create table export_request_report
(
    id                bigint not null primary key generated always as identity,
    export_request_id bigint not null references export_request (id) on delete cascade on update cascade,
    report_id         bigint not null references report (id) on delete cascade on update cascade
)
