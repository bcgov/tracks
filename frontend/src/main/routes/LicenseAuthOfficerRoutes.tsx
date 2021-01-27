import React from "react";
import TenureList from "../pages/license_auth_officer/TenureList";
import TenureEdit from "../pages/license_auth_officer/TenureEdit";
import TenureAdd from "../pages/license_auth_officer/TenureAdd";
import ReportList from "../pages/license_auth_officer/ReportList";

const LicenseAuthOfficerRoutes =
  [
    {path: "/license_auth_officer/tenures/list", component: TenureList},
    {path: "/license_auth_officer/tenures/edit/:id", component: TenureEdit},
    {path: "/license_auth_officer/tenures/add", component: TenureAdd},
    {path: "/license_auth_officer/reports/list", component: ReportList},

  ]

export default LicenseAuthOfficerRoutes;
