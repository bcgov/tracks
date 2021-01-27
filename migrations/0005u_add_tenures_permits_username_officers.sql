alter table user_mapping
    add username varchar(255) null;

create table tenure
(
    id           bigint       not null primary key generated always as identity,
    reference    varchar(255) not null,
    start_date   date         not null,
    end_date     date         null,
    organization bigint       not null references organization (id) on delete restrict on update cascade
);

create table subtenure
(
    id           bigint       not null primary key generated always as identity,
    reference    varchar(255) not null,
    start_date   date         not null,
    end_date     date         null,
    tenure       bigint       not null references tenure (id) on delete restrict on update cascade,
    organization bigint       not null references organization (id) on delete restrict on update cascade
);

create table permit
(
    id           bigint       not null primary key generated always as identity,
    reference    varchar(255) not null unique,
    start_date   date         not null,
    end_date     date         null,
    organization bigint       not null references organization (id) on delete restrict on update cascade
);

create table officer
(
    id         bigint       not null primary key generated always as identity,
    name       varchar(255) not null unique,
    region     bigint       not null references region (id) on delete restrict on update cascade,
    start_date date         not null,
    end_date   date         null
);

