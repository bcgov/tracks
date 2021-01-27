import cors from 'cors';
import http from 'http';
import helmet from 'helmet';
import express from 'express';
import morgan from 'morgan';
import {organizations} from "./apis/admin/organizations";
import {pool} from "./database";
import {CONFIG} from "./config";
import {jwksMiddleware} from "./jwt";
import {common} from "./apis/common";
import {users} from "./apis/admin/users";
import {tenures} from "./apis/admin/tenures";
import {permits} from "./apis/admin/permits";
import {regions} from "./apis/admin/regions";
import {officers} from './apis/admin/officers';
import {reports} from './apis/admin/reports';

import {travelPaths as officerTravelPaths} from "./apis/officers/travel_paths";
import {reports as officerReports} from './apis/officers/reports';

import {travelPaths as orgTravelPaths} from "./apis/operators/travel_paths";
import {reports as orgReports} from './apis/operators/reports';
import {tenures as orgTenures} from "./apis/operators/tenures";
import {permits as orgPermits} from "./apis/operators/permits";

import {reports as licenseAuthOfficersReports} from './apis/license_auth_officers/reports';
import {tenures as licenseAuthOfficersTenures} from './apis/license_auth_officers/tenures';

import {reports as areaAdminReports} from './apis/area_admin/reports';
import {permits as areaAdminPermits} from './apis/area_admin/permits';


import {MinioService} from "./services/minio_service";

const prefix = '/api/v1';


const jwks = jwksMiddleware({jwksUri: CONFIG.JWKS_URL});

const app = express()
  .use(helmet())
  .use(cors())
  .use(morgan('tiny'))
  .use(express.json())

  .get(`${prefix}/admin/organizations`, jwks.protect({
    requireRole: 'admin',
    requireOrganizationMapping: true
  }), organizations.list)

  .get(`${prefix}/admin/operators`, jwks.protect({
    requireRole: 'admin',
    requireOrganizationMapping: true
  }), organizations.operators)

  .get(`${prefix}/admin/organizations/:id`, jwks.protect({
    requireRole: 'admin',
    requireOrganizationMapping: true
  }), organizations.view)

  .get(`${prefix}/admin/operators/:id`, jwks.protect({
    requireRole: 'admin',
    requireOrganizationMapping: true
  }), organizations.view)

  .get(`${prefix}/admin/officers`, jwks.protect({
    requireRole: 'admin',
    requireOrganizationMapping: true
  }), officers.list)

  .get(`${prefix}/admin/officers/:id`, jwks.protect({
    requireRole: 'admin',
    requireOrganizationMapping: true
  }), officers.view)

  .get(`${prefix}/admin/reports`, jwks.protect({
    requireRole: 'admin',
    requireOrganizationMapping: true
  }), reports.list)

  .get(`${prefix}/admin/regions`, jwks.protect({
    requireRole: 'admin',
    requireOrganizationMapping: true
  }), regions.list)

  .get(`${prefix}/admin/permits`, jwks.protect({
    requireRole: 'admin',
    requireOrganizationMapping: true
  }), permits.list)

  .get(`${prefix}/admin/tenures`, jwks.protect({
    requireRole: 'admin',
    requireOrganizationMapping: true
  }), tenures.list)

  .get(`${prefix}/admin/users`, jwks.protect({
    requireRole: 'admin',
    requireOrganizationMapping: true
  }), users.list)

  .get(`${prefix}/officer/reports`, jwks.protect({
    requireRole: 'conservation_officer',
    requireOrganizationMapping: true
  }), officerReports.list)

  .get(`${prefix}/officer/travel_paths`, jwks.protect({
    requireRole: 'conservation_officer',
    requireOrganizationMapping: true
  }), officerTravelPaths.list)

  .get(`${prefix}/officer/travel_paths/:id`, jwks.protect({
    requireRole: 'conservation_officer',
    requireOrganizationMapping: true
  }), officerTravelPaths.view)

  .get(`${prefix}/officer/operator_travel_paths`, jwks.protect({
    requireRole: 'conservation_officer',
    requireOrganizationMapping: true
  }), officerTravelPaths.operatorTravelPaths)

  .get(`${prefix}/officer/operator_travel_paths/:id`, jwks.protect({
    requireRole: 'conservation_officer',
    requireOrganizationMapping: true
  }), officerTravelPaths.view)

  .get(`${prefix}/operator/reports`, jwks.protect({
    requireRole: 'commercial_operator',
    requireOrganizationMapping: true
  }), orgReports.list)

  .get(`${prefix}/operator/travel_paths/upload_request`, jwks.protect({
    requireRole: 'commercial_operator',
    requireOrganizationMapping: true
  }), orgTravelPaths.generateUploadRequest)

  .get(`${prefix}/operator/travel_paths`, jwks.protect({
    requireRole: 'commercial_operator',
    requireOrganizationMapping: true
  }), orgTravelPaths.list)

  .get(`${prefix}/operator/travel_paths/:id`, jwks.protect({
    requireRole: 'commercial_operator',
    requireOrganizationMapping: true
  }), orgTravelPaths.view)

  .post(`${prefix}/operator/travel_paths`, jwks.protect({
    requireRole: 'commercial_operator',
    requireOrganizationMapping: true
  }), orgTravelPaths.add)

  .get(`${prefix}/operator/permits`, jwks.protect({
    requireRole: 'commercial_operator',
    requireOrganizationMapping: true
  }), orgPermits.list)

  .get(`${prefix}/operator/permits/:id`, jwks.protect({
    requireRole: 'commercial_operator',
    requireOrganizationMapping: true
  }), orgPermits.view)

  .get(`${prefix}/operator/tenures`, jwks.protect({
    requireRole: 'commercial_operator',
    requireOrganizationMapping: true
  }), orgTenures.list)

  .get(`${prefix}/operator/tenures/:id`, jwks.protect({
    requireRole: 'commercial_operator',
    requireOrganizationMapping: true
  }), orgTenures.view)

  .get(`${prefix}/area_admin/reports`, jwks.protect({
    requireRole: 'area_admin',
    requireOrganizationMapping: true
  }), areaAdminReports.list)

  .get(`${prefix}/area_admin/permits`, jwks.protect({
    requireRole: 'area_admin',
    requireOrganizationMapping: true
  }), areaAdminPermits.list)

  .get(`${prefix}/license_auth_officer/reports`, jwks.protect({
    requireRole: 'license_auth_officer',
    requireOrganizationMapping: true
  }), licenseAuthOfficersReports.list)

  .get(`${prefix}/license_auth_officer/tenures`, jwks.protect({
    requireRole: 'license_auth_officer',
    requireOrganizationMapping: true
  }), licenseAuthOfficersTenures.list)

  .get('*', common.notFound);

const server = http.createServer(app);
const minio = MinioService;

server.listen(CONFIG.LISTEN_PORT, () => {
  console.log(`listening on port ${CONFIG.LISTEN_PORT}`);

  pool.connect().then((client) => {
    console.log('Database connection ok');
    client.release();
  }).catch(err => {
    console.error(`database connection error: ${err}, shutting down`);
    server.close();
  });

  minio.testConnection().catch(err => {
    console.error(err);
    console.error('Minio connection failed. Check configuration');
    server.close();
  });

});
