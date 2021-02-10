alter table travel_path rename to activity;
alter table travel_path_track_points rename to activity_track_points;
alter table activity_track_points rename column travel_path to activity_id;
alter table report_travel_path rename to report_activity;
alter table report_activity rename column travel_path_id to activity_id;
alter table file_upload rename column travel_path_id to activity_id;
