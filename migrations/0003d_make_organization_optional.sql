-- possibly irreversible, if null values exist
alter table user_mapping alter column organization set not null;
