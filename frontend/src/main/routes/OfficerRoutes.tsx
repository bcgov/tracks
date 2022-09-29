import React from "react";
import ActivityList from "../pages/conservation_officer/ActivityList";
import ActivityDetail from "../pages/conservation_officer/ActivityDetail";
import ReportList from "../pages/conservation_officer/ReportList";
import {Route, Routes} from "react-router";
import NotFound from "../pages/NotFound";


const OfficerRoutes = () => (
	<Routes>
		<Route path="/activities/list" element={<ActivityList/>}/>
		<Route path="/activities/view/:id" element={<ActivityDetail/>}/>
		<Route path="/reports/list" element={<ReportList/>}/>
		<Route path="*" element={<NotFound/>}/>
	</Routes>
)


export default OfficerRoutes;
