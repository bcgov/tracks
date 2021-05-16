import {JWTEnhancedRequest} from "./jwt";
import {TransactionalRequest} from "./database";

interface TracksRequest extends JWTEnhancedRequest, TransactionalRequest {

}

export {TracksRequest}
