import React from "react";
import PermitList from "../pages/area_admin/PermitList";
import PermitEdit from "../pages/area_admin/PermitEdit";
import ReportList from "../pages/area_admin/ReportList";
import {Route, Routes} from "react-router";

const AreaAdminRoutes: React.FC = () => (
  <Routes>
    <Route path="/area_admin/permits/list" element={<PermitList />} />
    <Route path="/area_admin/permits/edit/:id" element={<PermitEdit />} />
    <Route path="/area_admin/reports/list" element={<ReportList />} />
  </Routes>
);

export default AreaAdminRoutes;
