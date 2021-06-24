import {nav} from "../../../state/utilities/nav";
import {RequestAccess} from "./request_access";
import {RequestPending} from "./request_pending";

const navs = [
  nav('/uximports/unbound/request_access/bceid', 'Request Access (BCEID)', 'admin', 'Unbound Users', RequestAccess, {userType: 'BCEID'}),
  nav('/uximports/unbound/request_access/idir', 'Request Access (IDIR)', 'admin', 'Unbound Users', RequestAccess, {userType: 'IDIR'}),
  nav('/uximports/unbound/request_pending', 'Request Pending', 'admin', 'Unbound Users', RequestPending, {}),
];

export default navs;
