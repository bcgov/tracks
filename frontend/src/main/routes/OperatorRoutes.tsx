import React from "react";

import OperatorProfile from "../pages/operator/OperatorProfile";
import TravelPathList from "../pages/operator/TravelPathList";
import TravelPathDetail from "../pages/operator/TravelPathDetail";
import TenureList from "../pages/operator/TenureList";
import PermitList from "../pages/operator/PermitList";
import PermitDetail from "../pages/operator/PermitDetail";
import TenureDetail from "../pages/operator/TenureDetail";
import ReportList from "../pages/operator/ReportList";


const OperatorRoutes =
  [
    {path: "/operator/home", component: OperatorProfile},
    {path: "/operator/travel_paths/list", component: TravelPathList},
    {path: "/operator/travel_paths/view/:id", component: TravelPathDetail},
    {path: "/operator/tenures/view/:id", component: TenureDetail},
    {path: "/operator/tenures/list", component: TenureList},
    {path: "/operator/permits/list", component: PermitList},
    {path: "/operator/permits/view/:id", component: PermitDetail},
    {path: "/operator/reports/list", component: ReportList},

  ];

export default OperatorRoutes;
