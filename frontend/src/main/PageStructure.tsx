import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AuthRequired from './components/AuthRequired';
import Footer from './components/Footer';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Main from "./Main";
import {Provider} from 'react-redux';
import store from '../state/store';
import ContextualMetadata from "./components/ContextualMetadata";

const PageStructure = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div className={'appBody'}>
          <AuthRequired>
            {/*<ContextualMetadata/>*/}
            <div className={'container'} id={"mainColumnLayout"}>
              <div className={'containerInner'}>
                <Navigation />
                <Main />
              </div>
            </div>
          </AuthRequired>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  )
};

export default PageStructure;
