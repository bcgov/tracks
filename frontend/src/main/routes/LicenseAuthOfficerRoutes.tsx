import React from "react";
import TenureList from "../pages/license_auth_officer/TenureList";
import TenureEdit from "../pages/license_auth_officer/TenureEdit";
import TenureAdd from "../pages/license_auth_officer/TenureAdd";
import ReportList from "../pages/license_auth_officer/ReportList";
import {Route, Routes} from "react-router";

const LicenseAuthOfficerRoutes: React.FC = () => (
  <Routes>
    <Route path="/tenures/list" element={<TenureList />} />
    <Route path="/tenures/edit/:id" element={<TenureEdit />} />
    <Route path="/tenures/add" element={<TenureAdd />} />
    <Route path="/reports/list" element={<ReportList />} />
  </Routes>
);

export default LicenseAuthOfficerRoutes;
