import {defaultSagaGenerator} from "../utilities/redux_boilerplate_helper";
import {
	OfficerActions,
	OperatorActions,
	PermitActions,
	ReportActions,
	TenureActions,
	ActivityActions, ReportingPeriodActions, OnboardingRequestActions, TenureBindingRequestActions
} from "../actions";

const activitiesSaga = defaultSagaGenerator(ActivityActions, `:BASE/api/v1/:API/activities`);
const officersSaga = defaultSagaGenerator(OfficerActions, `:BASE/api/v1/:API/officers`);
const operatorsSaga = defaultSagaGenerator(OperatorActions, `:BASE/api/v1/:API/operators`);
const permitsSaga = defaultSagaGenerator(PermitActions, `:BASE/api/v1/:API/permits`);
const tenuresSaga = defaultSagaGenerator(TenureActions, `:BASE/api/v1/:API/tenures`);
const reportsSaga = defaultSagaGenerator(ReportActions, `:BASE/api/v1/:API/reports`);
const reportingPeriodsSaga = defaultSagaGenerator(ReportingPeriodActions, `:BASE/api/v1/:API/reporting_periods`);
const onboardingRequestsSaga = defaultSagaGenerator(OnboardingRequestActions, `:BASE/api/v1/:API/onboarding`);
const tenureBindingRequestsSaga = defaultSagaGenerator(TenureBindingRequestActions, `:BASE/api/v1/:API/tenure_bindings`);

export {activitiesSaga, officersSaga, operatorsSaga, permitsSaga, tenuresSaga, reportsSaga, reportingPeriodsSaga, onboardingRequestsSaga, tenureBindingRequestsSaga};
