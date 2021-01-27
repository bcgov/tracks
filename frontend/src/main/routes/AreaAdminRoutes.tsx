import React from "react";
import PermitList from "../pages/area_admin/PermitList";
import PermitEdit from "../pages/area_admin/PermitEdit";
import ReportList from "../pages/area_admin/ReportList";

const AreaAdminRoutes =
  [
    {path: "/area_admin/permits/list", component: PermitList},
    {path: "/area_admin/permits/edit/:id", component: PermitEdit},
    {path: "/area_admin/reports/list", component: ReportList},

  ]

export default AreaAdminRoutes;
