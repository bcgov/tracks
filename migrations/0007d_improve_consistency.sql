alter table user_mapping rename column organization_id to organization;
alter table officer rename column region_id to region;
alter table permit rename column organization_id to organization;
alter table tenure rename column organization_id to organization;
alter table subtenure rename column tenure_id to tenure;
alter table subtenure rename column organization_id to organization;
alter table travel_path rename column organization_id to organization;
alter table travel_path rename column user_sub to "user";

alter table organization drop column region_id;

