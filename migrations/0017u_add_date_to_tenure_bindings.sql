alter table tenure_binding_request
    add column created timestamp without time zone not null default current_timestamp;
