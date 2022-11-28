CREATE
EXTENSION btree_gist;

alter table report rename to trip_report;
alter table tenure rename to tenure_organization;
update tenure_organization
set end_date = 'infinity'::date
where end_date is null;
alter table tenure_organization
    alter column end_date set not null;
alter table tenure_organization
    alter column end_date set default 'infinity'::date;

alter table tenure_organization
    add column active boolean default true;
alter table tenure_organization
    add CONSTRAINT overlapping_times EXCLUDE USING GIST (reference with =, daterange(start_date, end_date) WITH && ) where (not active);

create type tenure_binding_request_state as enum ('SUBMITTED', 'ACCEPTED', 'REJECTED');

create table tenure_binding_request
(
    id                   bigint                       not null primary key generated always as identity,
    state                tenure_binding_request_state not null default 'SUBMITTED',
    reference            varchar(255)                 not null,
    requested_start_date date                         not null default current_date,
    requested_end_date   date                         not null default 'infinity':: date,
    organization_id      bigint                       not null references organization (id) on delete cascade on update cascade
);
