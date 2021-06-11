import {TantalisService} from "../services/tantalis_service";

jest.setTimeout(3000000);

test(
  'verify can get a token', async () =>  {
    const kms = new TantalisService();
    return await kms.refreshToken();
  }
);

test.only(
  'verify can download land use codes', async () => {
    const kms = new TantalisService();
    const result = await kms.searchInterestedParties("Bell%");
    console.dir(result);
  }
);
