import companies from '../../data/companies.json';
import orders from '../../data/orders.json';
import users from '../../data/users.json';

const rawData = { companies, orders, users };

function normalizeById(arr) {
  const byId = 'byId';
  const allIds = 'allIds';
  return arr.reduce(
    (result, obj) => {
      const { id } = obj;
      if (id !== undefined) {
        // eslint-disable-next-line no-param-reassign
        result[byId][id] = obj;
        result[allIds].push(id);
      }
      return result;
    },
    { [byId]: {}, [allIds]: [] },
  );
}

function normalizeData(obj) {
  return Object.keys(obj).reduce((result, key) => {
    // eslint-disable-next-line no-param-reassign
    result[key] = normalizeById(obj[key]);
    return result;
  }, {});
}

console.log(normalizeData(rawData));
