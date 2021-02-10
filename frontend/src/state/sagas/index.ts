import {defaultSagaGenerator} from "../utilities/redux_boilerplate_helper";
import {
  OfficerActions,
  OperatorActions,
  PermitActions,
  ReportActions,
  TenureActions,
  ActivityActions, ReportingPeriodActions
} from "../actions";
import CONFIG from "../../config";

const activitiesSaga = defaultSagaGenerator(ActivityActions, `${CONFIG.API_BASE}/api/v1/:API/activities`);
const officersSaga = defaultSagaGenerator(OfficerActions, `${CONFIG.API_BASE}/api/v1/:API/officers`);
const operatorsSaga = defaultSagaGenerator(OperatorActions, `${CONFIG.API_BASE}/api/v1/:API/operators`);
const permitsSaga = defaultSagaGenerator(PermitActions, `${CONFIG.API_BASE}/api/v1/:API/permits`);
const tenuresSaga = defaultSagaGenerator(TenureActions, `${CONFIG.API_BASE}/api/v1/:API/tenures`);
const reportsSaga = defaultSagaGenerator(ReportActions, `${CONFIG.API_BASE}/api/v1/:API/reports`);
const reportingPeriodsSaga = defaultSagaGenerator(ReportingPeriodActions, `${CONFIG.API_BASE}/api/v1/:API/reporting_periods`);

export {activitiesSaga, officersSaga, operatorsSaga, permitsSaga, tenuresSaga, reportsSaga, reportingPeriodsSaga};
