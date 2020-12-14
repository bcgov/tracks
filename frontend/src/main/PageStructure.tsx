import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AuthRequired from '../common/components/AuthRequired';
import Footer from '../common/components/Footer';
import Header from '../common/components/Header';
import Navigation from '../common/components/Navigation';
import LandingPage from "./pages/LandingPage";
import Admin from "./pages/admin/Admin";
import CommercialOperator from "./pages/operator/CommercialOperator";
import ConservationOfficer from "./pages/conservation_officer/ConservationOfficer";
import LeafletDemo from "../common/components/LeafletDemo";

const PageStructure = () => {
  return (
    <BrowserRouter>
      <Header />
      <AuthRequired>
        <Navigation />
        <main className={'container'}>
          <Switch>
            <Route path="/admin/home" component={Admin} />
            <Route path="/operator/home" component={CommercialOperator} />
            <Route path="/conservation_officer/home" component={ConservationOfficer} />
            <Route path="/map" component={LeafletDemo} />
            <Route component={LandingPage} />
          </Switch>
        </main>
      </AuthRequired>
      <Footer />
    </BrowserRouter>
  )
};

export default PageStructure;
