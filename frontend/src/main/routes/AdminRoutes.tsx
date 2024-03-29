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
import { Route, Routes } from "react-router";
import {TantalisDemo} from "../components/ttls/TantalisDemo";
import {TenureDetail} from "../components/ttls/TenureDetail";
import TenureBindingsManagement from "../pages/admin/TenureBindingsManagement";
import TripReports from "../pages/admin/TripReports";
import DataSubmissions from "../pages/admin/DataSubmissions";


const AdminRoutes = () => (
	<Routes>
		<Route path="/organizations/list" element={<OperatorList/>}/>
		<Route path="/organizations/view/:id" element={<OperatorDetail/>}/>
		<Route path="/organizations/edit/:id" element={<OperatorEdit/>}/>
		<Route path="/officers/list" element={<OfficerList/>}/>
		<Route path="/officers/view/:id" element={<OfficerDetail/>}/>
		<Route path="/officers/edit/:id" element={<OfficerEdit/>}/>
		<Route path="/reports/list" element={<ReportList/>}/>
		<Route path="/reporting_periods/list" element={<ReportingPeriodList/>}/>
		<Route path="/onboarding/list" element={<OnboardingList/>}/>
		<Route path="/pinpicker" element={<PinPickerDemo/>}/>
		<Route path="/tantalis" element={<TantalisDemo/>}/>
		<Route path="/tantalis/:id" element={<TenureDetail/>}/>
		<Route path="/tenure_binding_requests" element={<TenureBindingsManagement/>}/>
		<Route path="/TripReports" element={<TripReports/>}/>
		<Route path="/DataSubmissions" element={<DataSubmissions/>}/>
	</Routes>
);

export default AdminRoutes;
