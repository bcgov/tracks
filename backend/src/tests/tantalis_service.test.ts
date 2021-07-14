import {TantalisService} from "../services/tantalis_service";
import util from 'util';

jest.setTimeout(3000000);

const kms = new TantalisService();

test(
  'verify can get a token', async () => {
    return await kms.refreshToken();
  }
);

test(
  'verify can download all codes', async () => {
    const result = await kms.getAllCodes();
    console.log(util.inspect(result, {colors: true, depth: 4, breakLength: 120}));
    return result;
  }
);


test(
  'verify can download land use codes', async () => {
    const result = await kms.getLandUseCodes();
    console.log(util.inspect(result, {colors: true, depth: 4, breakLength: 120}));
    return result;
  }
);

test(
  'verify can download purpose codes', async () => {
    const result = await kms.getPurposeCodes();
    console.log(util.inspect(result, {colors: true, depth: 4, breakLength: 120}));
    return result;
  }
);

test(
  'verify can download status codes', async () => {
    const result = await kms.getStatusCodes();
    console.log(util.inspect(result, {colors: true, depth: 4, breakLength: 120}));
    return result;
  }
);

test(
  'verify can download stage codes', async () => {
    const result = await kms.getStageCodes();
    console.log(util.inspect(result, {colors: true, depth: 4, breakLength: 120}));
    return result;
  }
);

test(
  'verify can search interested parties by name', async () => {
    const result = await kms.searchInterestedPartiesByName('Bell%');
    console.log(util.inspect(result, {colors: true, depth: 4, breakLength: 120}));
    return result;
  });

test(
  'verify can search interested parties by postalCode', async () => {
    const result = await kms.searchInterestedPartiesByPostalCode('V0R1K0');
    console.log(util.inspect(result, {colors: true, depth: 4, breakLength: 120}));
    return result;
  });

test( 'can download landuse', async () => {
  const result = await kms.getLandUse('846833');
  console.log(util.inspect(result, {colors: true, depth: 4, breakLength: 120}));
  return result;
});


test.only( 'can search for tenures', async () => {
  const result = await kms.searchForTenures();
  console.log(util.inspect(result, {colors: true, depth: 4, breakLength: 120}));
  return result;
});

test.only( 'can do detailed search for tenures', async () => {
  const result = await kms.searchForTenures(true);
  console.log(util.inspect(result, {colors: true, depth: 4, breakLength: 120}));
  return result;
});

