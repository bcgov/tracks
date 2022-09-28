import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AuthRequired from './components/auth/AuthRequired';
import Footer from './components/page_elements/Footer';
import Header from './components/page_elements/Header';
import Navigation from './components/page_elements/Navigation';
import {Provider} from 'react-redux';
import AdminRoutes from "./routes/AdminRoutes";
import {Route, Routes} from "react-router";
import OperatorRoutes from "./routes/OperatorRoutes";
import OfficerRoutes from "./routes/OfficerRoutes";
//import SharedRoutes from "./routes/SharedRoutes";
import AreaAdminRoutes from "./routes/AreaAdminRoutes";
import LicenseAuthOfficerRoutes from "./routes/LicenseAuthOfficerRoutes";
//import {uximportnavs} from "./uximports/navigation";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import ContextualMetadata from "./components/page_elements/ContextualMetadata";

//const ConfigContext = React.createContext(null);

const App: React.FC<{ store }> = ({store}) => {
  return (

    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div className={'appBody'}>
          <AuthRequired>

            <ContextualMetadata />

            <div className={'container'} id={"mainColumnLayout"}>
              <div className={'containerInner'}>
              </div>
              <Navigation />
              <main>
                <Routes>
                  <Route path='/admin/*' element={<AdminRoutes />} />
                  <Route path='/officer/*' element={<OfficerRoutes />} />
                  <Route path='/operator/*' element={<OperatorRoutes />} />
                  <Route path='/license_auth_officer/*' element={<LicenseAuthOfficerRoutes />} />
                  <Route path='/area_admin/*' element={<AreaAdminRoutes />} />
                  <Route path="/" element={<LandingPage />} />
                  <Route path="" element={<LandingPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

            </div>
          </AuthRequired>
        </div>

        <Footer />
      </BrowserRouter>
    </Provider>
  )
};

export default App;
