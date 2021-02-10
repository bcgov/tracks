alter table activity add column end_time timestamp null;
alter table activity alter column start_time type timestamp;
alter table activity alter column created_at type timestamp;

alter table report  alter column created_at type timestamp with time zone;
alter table report  alter column updated_at type timestamp with time zone;

alter table file_upload  alter column created_at type timestamp with time zone;
alter table activity_track_points alter column timestamp type timestamp with time zone;
