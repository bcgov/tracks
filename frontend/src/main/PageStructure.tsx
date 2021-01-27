import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AuthRequired from '../common/components/AuthRequired';
import Footer from '../common/components/Footer';
import Header from '../common/components/Header';
import Navigation from '../common/components/Navigation';
import Main from "./Main";
import {Provider} from 'react-redux';
import store from '../state/store';

const PageStructure = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <AuthRequired>
          <Navigation />
          <Main />
        </AuthRequired>
        <Footer />
      </BrowserRouter>
    </Provider>
  )
};

export default PageStructure;
