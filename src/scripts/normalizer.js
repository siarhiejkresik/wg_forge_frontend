const byId = 'byId';
const allIds = 'allIds';

function normalizeById(arr) {
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

export default normalizeData;
