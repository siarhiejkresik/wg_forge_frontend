export function getOrderById(data, id) {
  return data.orders.byId[id];
}

export const getOrderValueByKey = key => (data, id) => {
  return getOrderById(data, id)[key];
};

export function getUserById(data, id) {
  return data.users.byId[id];
}

export function getUserByOrderId(data, id) {
  const userId = getOrderById(data, id).user_id;
  const user = getUserById(data, userId);
  return user;
}

export function getCompanyById(data, id) {
  return data.companies.byId[id];
}

export function getUserInfo(data, id) {
  const user = getUserById(data, id);
  const companyId = user.company_id;
  const company = user.company_id === null ? null : getCompanyById(data, companyId);
  return { user, company };
}

export function getUserInfoByOrderId(data, id) {
  const user = getUserByOrderId(data, id);
  return getUserInfo(data, user.id);
}

export function getLocationInfoByOrderId(data, id) {
  const order = getOrderById(data, id);
  const country = order.order_country;
  const ip = order.order_ip;
  return { country, ip };
}
