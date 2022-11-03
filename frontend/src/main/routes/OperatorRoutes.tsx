import React from "react";

import Profile from "../pages/operator/Profile";
import ActivityList from "../pages/operator/ActivityList";
import ActivityDetail from "../pages/operator/ActivityDetail";
import ReportList from "../pages/operator/ReportList";
import {Route, Routes} from "react-router";

const OperatorRoutes = () => (
	<Routes>
		<Route path="/profile" element={<Profile/>}/>
		<Route path="/activities/list" element={<ActivityList/>}/>
		<Route path="/activities/view/:id" element={<ActivityDetail/>}/>
		<Route path="/reports/list" element={<ReportList/>}/>
	</Routes>
);
//every bceid should be operator possibly others but for now they can only be operators. IDIR accounts can be other roles

export default OperatorRoutes;
