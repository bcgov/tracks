create table ttls_cache
(
    id      bigint       not null primary key generated always as identity,
    area    varchar(64)  not null,
    key     varchar(255) not null,
    expires timestamp with time zone null,
    data    json         not null
);
alter table ttls_cache add constraint unique_area_key unique (area, key);

