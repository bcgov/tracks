create type travel_path_mode_of_transport as enum ('WALK', 'CYCLE', 'FLY', 'HORSEBACK', 'WATERCRAFT', 'MOTOR VEHICLE (ON ROAD)', 'MOTOR VEHICLE (OFFROAD)', 'MIXED');

alter table travel_path
    add column mode_of_transport travel_path_mode_of_transport null;

create table travel_path_track_points
(
    id          bigint           not null primary key generated always as identity,
    geometry    geography(POINT) not null,
    timestamp   timestamp without time zone,
    accuracy    double precision null,
    travel_path bigint           not null references travel_path (id) on delete cascade on update cascade
);

comment on column travel_path_track_points.accuracy is 'HDOP or similar from GPX file';
