import { median } from './common';

export function ordersCount(ids) {
  return ids.length;
}

export function ordersTotal(ids, data) {
  return ids.reduce((sum, id) => sum + Number(data.orders.byId[id].total), 0);
}

export function medianValue(ids, data) {
  const values = ids.map(id => Number(data.orders.byId[id].total));
  return median(values);
}

export function averageCheck(ids, data) {
  const count = ordersCount(ids);
  if (count === 0) {
    return 0;
  }
  return ordersTotal(ids, data) / count;
}

export const orderIdsByUserGender = (ids, data, gender) => {
  const { orders, users } = data;
  return ids.filter(id => {
    const userId = orders.byId[id].user_id;
    const userGender = users.byId[userId].gender;
    return userGender === gender;
  });
};

export function averageCheckFemale(ids, data) {
  const femaleIds = orderIdsByUserGender(ids, data, 'Female');
  return averageCheck(femaleIds, data);
}

export function averageCheckMale(ids, data) {
  const maleIds = orderIdsByUserGender(ids, data, 'Male');
  return averageCheck(maleIds, data);
}

export function stats(ids, data) {
  let flag = false;
  if (ids.length === 0) {
    flag = true;
  }
  return {
    ordersCount: ordersCount(ids),
    ordersTotal: ordersTotal(ids, data),
    medianValue: medianValue(ids, data),
    averageCheck: {
      total: averageCheck(ids, data),
      female: averageCheckFemale(ids, data),
      male: averageCheckMale(ids, data),
    },
    _noVisibleIds: flag,
  };
}
