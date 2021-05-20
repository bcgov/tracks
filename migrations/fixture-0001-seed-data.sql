insert into region (name, active) values ('Lower Mainland', True);
insert into region (name, active) values ('Vancouver Island', True);

insert into organization (name, region_id) values ('Demo Commercial Operator 1', 1);
insert into organization (name, region_id) values ('Demo Commercial Operator 2', (select id from region where name like 'Lower Mainland'));

insert into organization (name, active, type, region_id)  values ('Government of British Columbia', true, 'GOVERNMENT', (select id from region where name like 'British Columbia'));

insert into tenure (reference, start_date, end_date, organization_id) values ('REF1230', now() - interval '1 years 9 days', '2023-12-31', (select id from organization where name like 'Demo Commercial Operator 1'));
insert into tenure (reference, start_date, end_date, organization_id) values ('REF84635248', now() - interval '4 years 9 days', '2020-12-31', (select id from organization where name like 'Demo Commercial Operator 1'));
insert into tenure (reference, start_date, end_date, organization_id) values ('UNKNOWN', now() + interval '2 months', '2023-12-31', (select id from organization where name like 'Demo Commercial Operator 2'));
insert into tenure (reference, start_date, end_date, organization_id) values ('REF1091', now(), '2027-12-31', (select id from organization where name like 'Demo Commercial Operator 2'));
insert into tenure (reference, start_date, end_date, organization_id) values ('REF390812809', now() - interval '3 days', '2021-12-31', (select id from organization where name like 'Demo Commercial Operator 2'));

insert into subtenure (reference, start_date, end_date, tenure_id, organization_id) values ('REF1091-ST1', now() + interval '2 days', '202-12-31', (select id from tenure where reference =  'REF1091'), (select id from organization where name like 'Demo Commercial Operator 1'));
insert into permit (reference, start_date, end_date, organization_id) values ('PP00003', now() - interval '1 year', '2027-12-31', (select id from organization where name like 'Demo Commercial Operator 2'));
insert into permit (reference, start_date, end_date, organization_id) values ('PP00007', now() - interval '1 year', '2032-12-31', (select id from organization where name like 'Demo Commercial Operator 2'));
insert into permit (reference, start_date, end_date, organization_id) values ('PP00045', now() + interval '1 year', '2032-12-31', (select id from organization where name like 'Demo Commercial Operator 2'));
insert into permit (reference, start_date, end_date, organization_id) values ('PP00004', now() - interval '1 year', '2025-12-31', (select id from organization where name like 'Demo Commercial Operator 1'));

insert into user_mapping(username, sub, organization_id) values ('adminuser', '04613e8b-0eb4-4f18-beff-8574726de9c1', (select id from organization where name like 'Government of British Columbia'));
