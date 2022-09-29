import React from "react";

import Disclaimer from "../pages/shared/Privacy";
import Privacy from "../pages/shared/Privacy";
import Accessibility from "../pages/shared/Accessibility";
import Copyright from "../pages/shared/Copyright";
import {Route, Routes} from "react-router";

const SharedRoutes = () => (

	<Routes>
		<Route path="/disclaimer" element={<Disclaimer/>}/>
		<Route path="/accessibility" element={<Accessibility/>}/>
		<Route path="/copyright" element={<Copyright/>}/>
		<Route path="/privacy" element={<Privacy/>}/>
	</Routes>
);

export default SharedRoutes;
