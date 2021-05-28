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

const AdminRoutes =
  [
    {path: "/admin/organizations/list", component: OperatorList},
    {path: "/admin/organizations/view/:id", component: OperatorDetail},
    {path: "/admin/organizations/edit/:id", component: OperatorEdit},
    {path: "/admin/officers/list", component: OfficerList},
    {path: "/admin/officers/view/:id", component: OfficerDetail},
    {path: "/admin/officers/edit/:id", component: OfficerEdit},
    {path: "/admin/reports/list", component: ReportList},
    {path: "/admin/reporting_periods/list", component: ReportingPeriodList},
    {path: "/admin/onboarding/list", component: OnboardingList},
    {path: "/admin/pinpicker", component: PinPickerDemo}
  ]

export default AdminRoutes;
