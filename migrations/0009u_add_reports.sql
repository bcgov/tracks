alter table file_uploads
    rename to file_upload;

create type report_state as enum ('DRAFT', 'SUBMITTED', 'ACCEPTED', 'REJECTED');
create type report_type as enum ('TRAVEL PATH REPORT', 'TRACK OBSERVATION REPORT');


create table report
(
    id                bigint                      not null primary key generated always as identity,
    organization_id   bigint                      not null references organization (id) on delete restrict on update cascade,
    user_sub          varchar(64)                 not null references user_mapping (sub) on delete restrict on update cascade,
    created_at        timestamp without time zone not null default now(),
    updated_at        timestamp without time zone not null default now(),
    park_permit_id    bigint                      null references permit (id) on delete restrict on update cascade,
    tenure_id         bigint                      null references tenure (id) on delete restrict on update cascade,
    state             report_state                not null default 'DRAFT',
    type              report_type                 not null,
    period_start_date date                        not null,
    period_end_date   date                        not null
);


-- join table
create table report_travel_path
(
    travel_path_id bigint references travel_path (id) on delete cascade on update cascade,
    report_id      bigint references report (id) on delete cascade on update cascade,
    constraint unique_tuples unique (travel_path_id, report_id)
);
