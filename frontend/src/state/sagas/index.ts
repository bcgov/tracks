import {defaultSagaGenerator} from "../utilities/redux_boilerplate_helper";
import {
  OfficerActions,
  OperatorActions,
  PermitActions,
  ReportActions,
  TenureActions,
  TravelPathActions
} from "../actions";
import CONFIG from "../../config";

const travelPathsSaga = defaultSagaGenerator(TravelPathActions, `${CONFIG.API_BASE}/api/v1/:API/travel_paths`);
const officersSaga = defaultSagaGenerator(OfficerActions, `${CONFIG.API_BASE}/api/v1/:API/officers`);
const operatorsSaga = defaultSagaGenerator(OperatorActions, `${CONFIG.API_BASE}/api/v1/:API/operators`);
const permitsSaga = defaultSagaGenerator(PermitActions, `${CONFIG.API_BASE}/api/v1/:API/permits`);
const tenuresSaga = defaultSagaGenerator(TenureActions, `${CONFIG.API_BASE}/api/v1/:API/tenures`);
const reportsSaga = defaultSagaGenerator(ReportActions, `${CONFIG.API_BASE}/api/v1/:API/reports`);

export {travelPathsSaga, officersSaga, operatorsSaga, permitsSaga, tenuresSaga, reportsSaga};
