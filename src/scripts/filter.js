function normalizeString(string) {
  return string.trim().toLowerCase();
}

export function containQueryString({ obj, query, whiteList, blackList }) {
  if (!obj || !query) {
    return false;
  }
  const normQuery = normalizeString(String(query));

  let keys = Object.keys(obj);
  if (whiteList) {
    keys = keys.filter(key => whiteList.includes(key));
  }
  if (blackList) {
    keys = keys.filter(key => !blackList.includes(key));
  }

  return keys.some(key => {
    const normValue = normalizeString(String(obj[key]));
    return normValue.includes(normQuery);
  });
}

// const userWhiteList = ['first_name', 'last_name'];
// const orderBlackList = ['created_at', 'card_number', 'user_id', 'id'];

// const data = [
//   {
//     obj: order,
//     blackList: orderBlackList,
//   },
//   {
//     obj: user,
//     whiteList: userWhiteList,
//   },
// ];

export function filter(query, arr) {
  return arr.some(obj => containQueryString({ ...obj, query }));
}
