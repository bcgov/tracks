insert into region (name, active)
values ('British Columbia', true)
on conflict do nothing;

alter table organization
    add column region_id bigint null references region (id) on delete restrict on update cascade;

update organization set region_id = (select id from region where name like 'British Columbia');

alter table organization alter column region_id set not null;

alter table officer
    rename column region to region_id;
alter table permit
    rename column organization to organization_id;

alter table tenure
    rename column organization to organization_id;
alter table subtenure
    rename column tenure to tenure_id;
alter table subtenure
    rename column organization to organization_id;

alter table travel_path
    rename column organization to organization_id;
alter table travel_path
    rename column "user" to user_sub;

alter table user_mapping
    rename column organization to organization_id;

