import * as React from 'react';
import {useEffect} from 'react';
import '../../styles/components/auth.scss';
import {useDispatch} from 'react-redux';
import {AUTH_INITIALIZE_REQUEST, AUTH_SIGNIN_REQUEST} from "../../../state/actions";
import Loading from "../util/Loading";
import RequestRoleBinding from "../../pages/RequestRoleBinding";
 import {useSelector} from "../../../state/utilities/use_selector";

const AuthRequired: React.FC<{children}> = (props) => {
  const {children} = props;

  const dispatch = useDispatch();

  const initialized = useSelector(state => state.Auth.initialized);
  const authenticated = useSelector(state => state.Auth.authenticated);

  const roles = useSelector(state => state.Auth.roles);

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
    if (roles.length > 0) {
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

export default AuthRequired;
