import components from './components';
import cos from './cos';
import cr_operators from './cr_operators';
import unbound from './unbound';
import staff from './staff';
import ttls from './ttls';

let uximportnavs = [];

uximportnavs = uximportnavs.concat(components);
uximportnavs = uximportnavs.concat(cos);
uximportnavs = uximportnavs.concat(cr_operators);
uximportnavs = uximportnavs.concat(unbound);
uximportnavs = uximportnavs.concat(staff);
uximportnavs = uximportnavs.concat(ttls);


export {uximportnavs};
