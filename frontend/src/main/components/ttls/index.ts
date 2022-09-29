import {nav} from "../../../state/utilities/nav";
import {TenureList} from "./tenure_list";
import {TenureDetail} from "./tenure_detail";

const navs = [
	nav('/uximports/ttls', 'Tenure List', 'admin', 'Tantalis Integration', TenureList, {}),
	nav('/uximports/ttls/detail/:id', 'Tenure Detail', 'admin', 'Tantalis Integration', TenureDetail, {}),
];

export default navs;
