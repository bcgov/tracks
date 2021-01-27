import React from "react";
import OperatorList from "../pages/admin/OperatorList";
import OperatorDetail from "../pages/admin/OperatorDetail";
import OperatorEdit from "../pages/admin/OperatorEdit";
import OperatorAdd from "../pages/admin/OperatorAdd";

import OfficerAdd from "../pages/admin/OfficerAdd";
import OfficerEdit from "../pages/admin/OfficerEdit";
import OfficerDetail from "../pages/admin/OfficerDetail";
import OfficerList from "../pages/admin/OfficerList";
import ReportList from "../pages/admin/ReportList";

const AdminRoutes =
  [
    {path: "/admin/organizations/list", component: OperatorList},
    {path: "/admin/organizations/view/:id", component: OperatorDetail},
    {path: "/admin/organizations/edit/:id", component: OperatorEdit},
    {path: "/admin/organizations/add", component: OperatorAdd},
    {path: "/admin/officers/list", component: OfficerList},
    {path: "/admin/officers/view/:id", component: OfficerDetail},
    {path: "/admin/officers/edit/:id", component: OfficerEdit},
    {path: "/admin/officers/add", component: OfficerAdd},
    {path: "/admin/reports/list", component: ReportList}

  ]

export default AdminRoutes;
