import {combineReducers} from "redux";
import {Auth} from "./auth";
import {TravelPathUpload} from "./travel_path_uploads";

import {
  OfficerActions,
  OperatorActions,
  PermitActions,
  ReportActions,
  TenureActions,
  ActivityActions
} from "../actions";
import {defaultReducer} from "../utilities/redux_boilerplate_helper";

const rootReducer = combineReducers({
  Activities: defaultReducer(ActivityActions),
  Permits: defaultReducer(PermitActions),
  Tenures: defaultReducer(TenureActions),
  Reports: defaultReducer(ReportActions),
  Operators: defaultReducer(OperatorActions),
  Officers: defaultReducer(OfficerActions),
  TravelPathUpload,
  Auth,
});

export {rootReducer};
