import React from "react";

import Profile from "../pages/operator/Profile";
import ActivityList from "../pages/operator/ActivityList";
import ActivityDetail from "../pages/operator/ActivityDetail";
import ReportList from "../pages/operator/ReportList";


const OperatorRoutes =
  [
    {path: "/operator/profile", component: Profile},
    {path: "/operator/activities/list", component: ActivityList},
    {path: "/operator/activities/view/:id", component: ActivityDetail},
    {path: "/operator/reports/list", component: ReportList},

  ];

export default OperatorRoutes;
