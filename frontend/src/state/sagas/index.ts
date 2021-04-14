import {defaultSagaGenerator} from "../utilities/redux_boilerplate_helper";
import {
  OfficerActions,
  OperatorActions,
  PermitActions,
  ReportActions,
  TenureActions,
  ActivityActions, ReportingPeriodActions, OnboardingRequestActions
} from "../actions";

const activitiesSaga = defaultSagaGenerator(ActivityActions, `${window.CONFIG.API_BASE}/api/v1/:API/activities`);
const officersSaga = defaultSagaGenerator(OfficerActions, `${window.CONFIG.API_BASE}/api/v1/:API/officers`);
const operatorsSaga = defaultSagaGenerator(OperatorActions, `${window.CONFIG.API_BASE}/api/v1/:API/operators`);
const permitsSaga = defaultSagaGenerator(PermitActions, `${window.CONFIG.API_BASE}/api/v1/:API/permits`);
const tenuresSaga = defaultSagaGenerator(TenureActions, `${window.CONFIG.API_BASE}/api/v1/:API/tenures`);
const reportsSaga = defaultSagaGenerator(ReportActions, `${window.CONFIG.API_BASE}/api/v1/:API/reports`);
const reportingPeriodsSaga = defaultSagaGenerator(ReportingPeriodActions, `${window.CONFIG.API_BASE}/api/v1/:API/reporting_periods`);
const onboardingRequestsSaga = defaultSagaGenerator(OnboardingRequestActions, `${window.CONFIG.API_BASE}/api/v1/:API/onboarding`);

export {activitiesSaga, officersSaga, operatorsSaga, permitsSaga, tenuresSaga, reportsSaga, reportingPeriodsSaga, onboardingRequestsSaga};
