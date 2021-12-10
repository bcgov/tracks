import React from "react";

import Profile from "../pages/operator/Profile";
import ActivityList from "../pages/operator/ActivityList";
import ActivityDetail from "../pages/operator/ActivityDetail";
import ReportList from "../pages/operator/ReportList";
import {Route, Routes} from "react-router";


const OperatorRoutes: React.FC = () => (
  <Routes>
    <Route path="/operator/profile" element={<Profile/>}/>
    <Route path="/operator/activities/list" element={<ActivityList/>}/>
    <Route path="/operator/activities/view/:id" element={<ActivityDetail/>}/>
    <Route path="/operator/reports/list" element={<ReportList/>}/>
  </Routes>
);

export default OperatorRoutes;
