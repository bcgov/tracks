import React from "react";
import TravelPathList from "../pages/conservation_officer/TravelPathList";
import TravelPathDetail from "../pages/conservation_officer/TravelPathDetail";
import TravelPathAdd from "../pages/conservation_officer/TravelPathAdd";
import ReportList from "../pages/conservation_officer/ReportList";


const OfficerRoutes =
  [
    {path: "/officer/travel_paths/list", component: TravelPathList},
    {path: "/officer/travel_paths/add", component: TravelPathAdd},
    {path: "/officer/travel_paths/view/:id", component: TravelPathDetail},
    {path: "/officer/reports/list", component: ReportList},
  ];

export default OfficerRoutes;
