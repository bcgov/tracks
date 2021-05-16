#!/bin/sh
gradle --no-daemon --no-watch-fs -PdbUrl="jdbc:postgresql://${TRACKS_DB_HOST}/${TRACKS_DB_NAME}" -PdbUser="${TRACKS_DB_USER}" -PdbPassword="${TRACKS_DB_PASSWORD}" update
