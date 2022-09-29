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
