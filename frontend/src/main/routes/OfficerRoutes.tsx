import React from "react";
import ActivityList from "../pages/conservation_officer/ActivityList";
import ActivityDetail from "../pages/conservation_officer/ActivityDetail";
import ReportList from "../pages/conservation_officer/ReportList";


const OfficerRoutes =
  [
    {path: "/officer/activities/list", component: ActivityList},
    {path: "/officer/activities/view/:id", component: ActivityDetail},
    {path: "/officer/reports/list", component: ReportList},
  ];

export default OfficerRoutes;
