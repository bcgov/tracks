create type role_binding_status as enum ('PENDING', 'ACTIONED', 'REJECTED');

create table role_binding_request
(
    id                        bigint                      not null primary key generated always as identity,
    created                   timestamp without time zone not null default now(),
    status                    role_binding_status         not null default 'PENDING',
    requested_organization_id bigint                      null references organization (id) on delete cascade on update cascade,
    sub                       varchar(64)                 not null,
    username                  varchar(255)                not null,
    full_name                 varchar(255)                not null,
    email                     varchar(255)                not null,
    reason                    text                        not null,
    requested_role            varchar(64)                 not null
);
