import companies from '../../data/companies.json';
import orders from '../../data/orders.json';
import users from '../../data/users.json';

const rawData = { companies, orders, users };

function fetcher() {
  // return Promise.all(rawData.map(data => Promise.resolve(data)));
  return rawData;
}

export default fetcher;
