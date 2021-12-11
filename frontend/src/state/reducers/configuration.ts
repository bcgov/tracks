import {
  SIGNUP_REQUEST_BINDING_SUBMIT,
  SIGNUP_REQUEST_BINDING_STARTED,
  SIGNUP_REQUEST_BINDING_COMPLETE,
  SIGNUP_REQUEST_BINDING_ERROR
} from "../actions";
import {TracksConfig} from "../config";


interface ConfigurationState {
  current: TracksConfig
}


function createConfigurationReducedWithDefaultState(configuration: TracksConfig) {

  const initialState: ConfigurationState = {
    current: configuration
  };

  return (state = initialState, action) => {
    return state;
  };


}

export {createConfigurationReducedWithDefaultState};
