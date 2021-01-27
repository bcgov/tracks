alter table travel_path
    add column gpx_file_data bytea null;

drop table file_uploads;
