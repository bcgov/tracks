import {BusinessObjectActionNames} from "../utilities/redux_boilerplate_helper";

const AUTH_ACT_AS = 'AUTH_ACT_AS';
const AUTH_REQUEST_COMPLETE = 'AUTH_REQUEST_COMPLETE';
const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';
const AUTH_SIGNOUT_REQUEST = 'AUTH_SIGNOUT_REQUEST';
const AUTH_INITIALIZE_REQUEST = 'AUTH_INITIALIZE_REQUEST';
const AUTH_INITIALIZE_COMPLETE = 'AUTH_INITIALIZE_COMPLETE';
const AUTH_SIGNIN_REQUEST = 'AUTH_SIGNIN_REQUEST';

export {
  AUTH_SIGNIN_REQUEST,
  AUTH_SIGNOUT_REQUEST,
  AUTH_INITIALIZE_REQUEST,
  AUTH_INITIALIZE_COMPLETE,
  AUTH_REQUEST_COMPLETE,
  AUTH_REQUEST_ERROR,
  AUTH_ACT_AS
};

const TravelPathActions = new BusinessObjectActionNames('TRAVEL_PATH');
const PermitActions = new BusinessObjectActionNames('PERMIT');
const TenureActions = new BusinessObjectActionNames('TENURE');
const OfficerActions = new BusinessObjectActionNames('OFFICER');
const ReportActions = new BusinessObjectActionNames('REPORT');
const OperatorActions = new BusinessObjectActionNames('OPERATOR');

export {
  TravelPathActions,
  PermitActions,
  TenureActions,
  OfficerActions,
  ReportActions,
  OperatorActions
};
