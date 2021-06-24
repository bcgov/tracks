import {nav} from "../../../state/utilities/nav";
import {AccessDenied} from "./access_denied";

const navs = [
  nav('/uximports/components/access_denied', 'Access Denied', 'admin', 'Components', AccessDenied, {test: 'foo'}),
];

export default navs;
