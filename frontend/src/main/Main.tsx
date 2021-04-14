import React from "react";
import {Route, Switch} from "react-router";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import AdminRoutes from "./routes/AdminRoutes";
import OperatorRoutes from "./routes/OperatorRoutes";
import OfficerRoutes from "./routes/OfficerRoutes";
import SharedRoutes from "./routes/SharedRoutes";
import AreaAdminRoutes from "./routes/AreaAdminRoutes";
import LicenseAuthOfficerRoutes from "./routes/LicenseAuthOfficerRoutes";

const Main = () => {
  return (
    <main>
      <div>
        <Switch>
          {
            AdminRoutes.map((r, i) => (
              <Route key={`admin-${i}`} component={r.component} path={r.path} />
            ))
          }
          {
            OperatorRoutes.map((r, i) => (
              <Route key={`operator-${i}`} component={r.component} path={r.path} />
            ))
          }
          {
            OfficerRoutes.map((r, i) => (
              <Route key={`officer-${i}`} component={r.component} path={r.path} />
            ))
          }
          {
            SharedRoutes.map((r, i) => (
              <Route key={`shared-${i}`} component={r.component} path={r.path} />
            ))
          }

          {
            AreaAdminRoutes.map((r, i) => (
              <Route key={`area-admin-${i}`} component={r.component} path={r.path} />
            ))
          }

          {
            LicenseAuthOfficerRoutes.map((r, i) => (
              <Route key={`license-auth-officer-${i}`} component={r.component} path={r.path} />
            ))
          }

          <Route path="/" component={LandingPage} />
          <Route path="" component={LandingPage} />

          <Route path="*" component={NotFound} />

        </Switch>
      </div>
    </main>
  );
};

export default Main;
