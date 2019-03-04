import Cell from './Cell';
import UserInfoCell from './UserInfoCell';

import * as selectors from '../scripts/selectors';

import {
  trOrderId,
  orderDate,
  orderLocation,
  cardNumberEscaped,
  currency,
} from '../scripts/formatters';

function onUserLinkClick(e) {
  const a = e.target.closest('a.data-user-link');
  if (!a) {
    return;
  }
  const td = a.closest('td.user-data');
  if (!td) {
    return;
  }
  const userDataNode = td.querySelector('.user-details');
  if (!userDataNode) {
    return;
  }
  userDataNode.hidden = !userDataNode.hidden;
  e.preventDefault();
}

export default function(data) {
  const { orders } = data;
  const tbody = document.createElement('tbody');
  tbody.id = 'orders';

  if (!orders) {
    return tbody;
  }

  orders.allIds.forEach(id => {
    const order = orders.byId[id];

    const tr = tbody.insertRow();
    tr.id = trOrderId(id);

    // Transaction ID
    tr.appendChild(Cell(order.transaction_id));

    // User Info
    const userInfo = selectors.getUserInfoByOrderId(data, id);
    const userInfoTd = UserInfoCell(userInfo);
    tr.appendChild(userInfoTd);

    // Order Date
    tr.appendChild(Cell(order.created_at, orderDate));

    // Order Amount
    tr.appendChild(Cell(order.total, currency));

    // Card Number
    tr.appendChild(Cell(order.card_number, cardNumberEscaped));

    // Card Type
    tr.appendChild(Cell(order.card_type));

    // Location
    const location = selectors.getLocationInfoByOrderId(data, id);
    tr.appendChild(Cell(orderLocation(location.country, location.ip)));

    // event listeners
    tbody.addEventListener('click', onUserLinkClick);
  });

  return tbody;
}
