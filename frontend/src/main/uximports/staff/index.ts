import {nav} from "../../../state/utilities/nav";
import {CROperatorAdd} from "./add_cr_operator";
import {CROperatorList} from "./cr_operators_list";
import {TravelPathReportList} from "./travel_path_report_list";
import {TenureAddModify} from "./add_edit_tenure";
import {PermitAddModify} from "./add_edit_permit";
import {TravelPathReportView} from "./travel_path_report";
import {UserList} from "./user_list";
import {UserAccessRequestList} from "./user_access_requests";
import {UserAccessRequestReview} from "./user_access_request_review";

const navs = [
  nav('/uximports/staff/cr_operator_add', 'Add CR Operator', 'admin', 'Staff', CROperatorAdd, {}),
  nav('/uximports/staff/cr_operator_list', 'List CR Operators', 'admin', 'Staff', CROperatorList, {}),
  nav('/uximports/staff/permit_add', 'Park Permit Add', 'admin', 'Staff', PermitAddModify, {mode: 'ADD'}),
  nav('/uximports/staff/permit_edit', 'Park Permit Edit', 'admin', 'Staff', PermitAddModify, {mode: 'EDIT'}),
  nav('/uximports/staff/tenure_add', 'Tenure Add', 'admin', 'Staff', TenureAddModify, {mode: 'ADD'}),
  nav('/uximports/staff/tenure_edit', 'Tenure Edit', 'admin', 'Staff', TenureAddModify, {mode: 'EDIT'}),
  nav('/uximports/staff/travel_path_report_list', 'Travel Path Report List', 'admin', 'Staff', TravelPathReportList, {}),
  nav('/uximports/staff/travel_path_report_list', 'Travel Path Report View (Review)', 'admin', 'Staff', TravelPathReportView, {acceptanceStatus: 'PENDING'}),
  nav('/uximports/staff/travel_path_report_list', 'Travel Path Report View (Accepted)', 'admin', 'Staff', TravelPathReportView, {acceptanceStatus: 'ACCEPTED'}),
  nav('/uximports/staff/travel_path_report_list', 'Travel Path Report View (Rejected)', 'admin', 'Staff', TravelPathReportView, {acceptanceStatus: 'REJECTED', reason: 'I felt like it.'}),
  nav('/uximports/staff/user_list', 'User List', 'admin', 'Staff', UserList, {}),
  nav('/uximports/staff/user_access_request', 'User Access Request Review', 'admin', 'Staff', UserAccessRequestReview, {}),



];

export default navs;
