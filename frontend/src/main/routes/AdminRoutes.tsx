import React from "react";
import OperatorList from "../pages/admin/OperatorList";
import OperatorDetail from "../pages/admin/OperatorDetail";
import OperatorEdit from "../pages/admin/OperatorEdit";
import OfficerEdit from "../pages/admin/OfficerEdit";
import OfficerDetail from "../pages/admin/OfficerDetail";
import OfficerList from "../pages/admin/OfficerList";
import ReportList from "../pages/admin/ReportList";
import ReportingPeriodList from "../pages/admin/ReportingPeriodList";
import OnboardingList from "../pages/admin/OnboardingList";
import PinPickerDemo from "../pages/admin/PinPickerDemo";
import {Route, Routes} from "react-router";

const AdminRoutes: React.FC = () => (
  <Routes>
    <Route path="/admin/organizations/list" element={<OperatorList />} />
    <Route path="/admin/organizations/view/:id" element={<OperatorDetail />} />
    <Route path="/admin/organizations/edit/:id" element={<OperatorEdit />} />
    <Route path="/admin/officers/list" element={<OfficerList />} />
    <Route path="/admin/officers/view/:id" element={<OfficerDetail />} />
    <Route path="/admin/officers/edit/:id" element={<OfficerEdit />} />
    <Route path="/admin/reports/list" element={<ReportList />} />
    <Route path="/admin/reporting_periods/list" element={<ReportingPeriodList />} />
    <Route path="/admin/onboarding/list" element={<OnboardingList />} />
    <Route path="/admin/pinpicker" element={<PinPickerDemo />} />
  </Routes>
);

export default AdminRoutes;
