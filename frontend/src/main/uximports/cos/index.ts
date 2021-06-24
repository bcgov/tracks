import {nav} from "../../../state/utilities/nav";
import {ObservationAdd} from "./observation_add";
import {ReportCreate} from "./report_create";
import {ObservationView} from "./observation_view";
import {ReportView} from "./report_view";
import {ReportList} from "./report_list";
import {ReportEdit} from "./report_edit";

const navs = [
  nav('/uximports/cos/observation_add','Add Observation', 'admin', 'Conservation Officer', ObservationAdd, {}),
  nav('/uximports/cos/observation_view','View Observation', 'admin', 'Conservation Officer', ObservationView, {}),
  nav('/uximports/cos/report_create','Report Create', 'admin', 'Conservation Officer', ReportCreate, {}),
  nav('/uximports/cos/report_edit','Report Edit', 'admin', 'Conservation Officer', ReportEdit, {}),
  nav('/uximports/cos/report_list','Report List', 'admin', 'Conservation Officer', ReportList, {}),
  nav('/uximports/cos/report_view','Report View', 'admin', 'Conservation Officer', ReportView, {}),
];

export default navs;
