import * as React from 'react';
import {useEffect} from 'react';
import '../styles/components/auth.scss';
import {withRouter} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {AUTH_INITIALIZE_REQUEST, AUTH_SIGNIN_REQUEST} from "../../state/actions";
import Loading from "./Loading";
import RequestRoleBinding from "../pages/RequestRoleBinding";

const AuthRequired = (props) => {
  const {children} = props;

  const dispatch = useDispatch();

  const initialized = useSelector(state => state.Auth.initialized);
  const authenticated = useSelector(state => state.Auth.authenticated);

  const roleBound = useSelector(state => state.Auth.roles).length > 0;

  const signin = () => dispatch({type: AUTH_SIGNIN_REQUEST});
  const initialize = () => dispatch({type: AUTH_INITIALIZE_REQUEST});

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized]);

  if (!initialized) {
    return (<Loading />);
  }

  if (authenticated) {
    if (roleBound) {
      return (
        <>
          {children}
        </>
      );
    } else {
      return (
        <RequestRoleBinding />
      )
    }

  }

  return (
    <div className={'authRequired'}>
      <h1>Authentication Required</h1>
      <button
        id={'loginButton'}
        onClick={() => {
          signin();
        }}
      >
        Authenticate
      </button>
    </div>
  );

};

export default withRouter(AuthRequired);
