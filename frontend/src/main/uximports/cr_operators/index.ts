import {nav} from "../../../state/utilities/nav";
import {ConfirmSubmission} from "./confirm_submission";
import {ReportView} from "../cos/report_view";
import {ReportList} from "./report_list";
import {ReportEdit} from "./report_edit";

const navs = [
  nav('/uximports/cr_operators/confirm_submission', 'Confirm Submission', 'admin', 'Commercial Operator', ConfirmSubmission, {}),
  nav('/uximports/cr_operators/report_edit', 'Report Edit', 'admin', 'Commercial Operator', ReportEdit, {}),
  nav('/uximports/cr_operators/report_list', 'Report List', 'admin', 'Commercial Operator', ReportList, {}),
  nav('/uximports/cr_operators/report_view', 'Report View Submitted', 'admin', 'Commercial Operator', ReportView, {acceptanceStatus: 'PENDING'}),
  nav('/uximports/cr_operators/report_view/accepted', 'Report View Accepted', 'admin', 'Commercial Operator', ReportView, {acceptanceStatus: 'ACCEPTED'}),
  nav('/uximports/cr_operators/report_view/submitted', 'Report View Rejected', 'admin', 'Commercial Operator', ReportView, {acceptanceStatus: 'REJECTED', reason: 'I felt like it'}),
];

export default navs;
