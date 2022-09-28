import React from "react";
import PermitList from "../pages/area_admin/PermitList";
import PermitEdit from "../pages/area_admin/PermitEdit";
import ReportList from "../pages/area_admin/ReportList";
import {Route, Routes} from "react-router";

const AreaAdminRoutes: React.FC = () => (
  <Routes>
    <Route path="/permits/list" element={<PermitList />} />
    <Route path="/permits/edit/:id" element={<PermitEdit />} />
    <Route path="/reports/list" element={<ReportList />} />
  </Routes>
);

export default AreaAdminRoutes;
