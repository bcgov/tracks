import React from "react";
import {Route, Routes} from "react-router";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import AdminRoutes from "./routes/AdminRoutes";
import OperatorRoutes from "./routes/OperatorRoutes";
import OfficerRoutes from "./routes/OfficerRoutes";
import SharedRoutes from "./routes/SharedRoutes";
import AreaAdminRoutes from "./routes/AreaAdminRoutes";
import LicenseAuthOfficerRoutes from "./routes/LicenseAuthOfficerRoutes";
import {uximportnavs} from "./uximports/navigation";

const Main = () => {
  return (
    <main>
      <div>
        <Routes>
          {
            AdminRoutes.map((r, i) => (
              <Route key={`admin-${i}`} element={r.component()} path={r.path} />
            ))
          }
          {
            OperatorRoutes.map((r, i) => (
              <Route key={`operator-${i}`} element={r.component()} path={r.path} />
            ))
          }
          {
            OfficerRoutes.map((r, i) => (
              <Route key={`officer-${i}`} element={r.component()} path={r.path} />
            ))
          }
          {
            SharedRoutes.map((r, i) => (
              <Route key={`shared-${i}`} element={r.component()} path={r.path} />
            ))
          }

          {
            AreaAdminRoutes.map((r, i) => (
              <Route key={`area-admin-${i}`} element={r.component()} path={r.path} />
            ))
          }

          {
            LicenseAuthOfficerRoutes.map((r, i) => (
              <Route key={`license-auth-officer-${i}`} element={r.component()} path={r.path} />
            ))
          }

          {
            uximportnavs.map((r, i) => (
                <Route key={`uximports=${i}`} path={r.path} element={() => r.component(r.props)} />
              )
            )
          }

          <Route path="/" element={<LandingPage/>} />
          <Route path="" element={<LandingPage/>} />

          <Route path="*" element={<NotFound/>} />

        </Routes>
      </div>
    </main>
  );
};

export default Main;
