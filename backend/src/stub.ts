import cors from 'cors';
import http from 'http';
import helmet from 'helmet';
import express from 'express';
import morgan from 'morgan';
import {CONFIG} from "./config";
import {common} from "./apis/common";

import stubapi from './stubapis';

const prefix = '/api/v1';

const app = express()
  .use(helmet())
  .use(cors())
  .use(morgan('tiny'))
  .use(express.json())

  .get(`${prefix}/admin/organizations`, stubapi.admin.organizations.list)
  .get(`${prefix}/admin/organizations/:id`, stubapi.admin.organizations.view)

  .get(`${prefix}/admin/reports`, stubapi.admin.reports.list)

  .get(`${prefix}/officer/reports`, stubapi.conservation_officer.reports.list)

  .get(`${prefix}/officer/activities`, stubapi.conservation_officer.activities.list)

  .get(`${prefix}/operator/reports`, stubapi.commercial_operator.reports.list)

  .get(`${prefix}/operator/activities`, stubapi.commercial_operator.activities.list)

  .get(`${prefix}/operator/activities/:id`, stubapi.commercial_operator.activities.view)

  .get(`${prefix}/operator/permits`, stubapi.commercial_operator.permits.list)

  .get(`${prefix}/operator/tenures`, stubapi.commercial_operator.tenures.list)

  .get(`${prefix}/area_admin/reports`, stubapi.area_admin.reports.list)

  .get(`${prefix}/area_admin/permits`, stubapi.area_admin.permits.list)

  .get(`${prefix}/license_auth_officer/reports`, stubapi.license_auth_officer.reports.list)

  .get(`${prefix}/license_auth_officer/tenures`, stubapi.license_auth_officer.permits.list)

  .get('*', common.notFound);

const server = http.createServer(app);

server.listen(CONFIG.LISTEN_PORT, () => {
  console.log(`listening on port ${CONFIG.LISTEN_PORT}`);
});
