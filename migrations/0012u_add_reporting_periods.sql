alter table activity alter column end_time  type timestamp with time zone;
alter table activity alter column start_time type timestamp with time zone;
alter table activity alter column created_at type timestamp with time zone;

create table reporting_period
(
    id                bigint not null primary key generated always as identity,
    start_date date   not null,
    end_date   date   not null,
    deadline   date not null
);

alter table report drop column period_start_date;
alter table report drop column period_end_date;

alter table report add column reporting_period_id bigint null references reporting_period(id) on delete restrict on update cascade;

