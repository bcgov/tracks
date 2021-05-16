import {TantalisService} from "../services/tantalis_service";

jest.setTimeout(30000);

test(
  'verify can get a token', () => {
    const kms = new TantalisService();
    return kms.refreshToken();
  }
);

test.only(
  'verify can download land use codes', () => {
    const kms = new TantalisService();
    return expect(kms.getLandUseCodes()).resolves.toReturn()
  }
);
