alter table activity  rename to travel_path;
alter table activity_track_points rename to travel_path_track_points;
alter table travel_path_track_points rename column activity_id to travel_path;
alter table report_activity rename to report_travel_path;
alter table report_travel_path rename column  activity_id to travel_path_id;
alter table file_upload rename column  activity_id to travel_path_id;
