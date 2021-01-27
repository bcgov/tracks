create table file_uploads
(
    id               bigint                      not null primary key generated always as identity,
    organization_id  bigint                      not null references organization (id) on delete restrict on update cascade,
    user_sub         varchar(64)                 not null references user_mapping (sub) on delete restrict on update cascade,
    minio_identifier varchar(64)                 not null,
    travel_path_id   bigint                      null references travel_path (id) on delete cascade on update cascade, -- can be null if the tp doesn't exist yet
    created_at       timestamp without time zone not null default now()
);

alter table travel_path
    drop column gpx_file_data;
