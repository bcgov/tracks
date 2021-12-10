import React from "react";
import TenureList from "../pages/license_auth_officer/TenureList";
import TenureEdit from "../pages/license_auth_officer/TenureEdit";
import TenureAdd from "../pages/license_auth_officer/TenureAdd";
import ReportList from "../pages/license_auth_officer/ReportList";
import {Route, Routes} from "react-router";

const LicenseAuthOfficerRoutes: React.FC = () => (
  <Routes>
    <Route path="/license_auth_officer/tenures/list" element={<TenureList />} />
    <Route path="/license_auth_officer/tenures/edit/:id" element={<TenureEdit />} />
    <Route path="/license_auth_officer/tenures/add" element={<TenureAdd />} />
    <Route path="/license_auth_officer/reports/list" element={<ReportList />} />
  </Routes>
);

export default LicenseAuthOfficerRoutes;
