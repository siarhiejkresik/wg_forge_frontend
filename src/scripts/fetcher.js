import normalizeData from './normalizer';

import companies from '../../data/companies.json';
import orders from '../../data/orders.json';
import users from '../../data/users.json';

const rawData = { companies, orders, users };

function getRawData() {
  return rawData;
}

function fetcher() {
  return normalizeData(getRawData());
}

export default fetcher;
