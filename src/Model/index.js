import fetcher from '../scripts/fetcher';

import { contain } from '../scripts/filter';
import { stats } from '../scripts/stats';
import { sorter } from '../scripts/sorter';
import * as selectors from '../scripts/selectors';

const userWhiteList = ['first_name', 'last_name'];
const orderBlackList = ['created_at', 'card_number', 'user_id', 'id'];

const getFilterData = ({ order, user }) => [
  {
    obj: order,
    blackList: orderBlackList,
  },
  {
    obj: user,
    whiteList: userWhiteList,
  },
];

export default class {
  constructor() {
    this.data = fetcher();
    this.visibleIds = [];
    this.resetFilter();
  }

  get stats() {
    return stats(this.visibleIds, this.data);
  }

  applyFilter(query) {
    this.evalVisibleIds(query);
  }

  resetFilter() {
    this.visibleIds = Array.from(this.data.orders.allIds) || [];
  }

  evalVisibleIds(query) {
    const orderIds = this.data.orders.allIds;

    if (!query || query === '') {
      this.resetFilter();
      return;
    }

    this.visibleIds = orderIds.filter(id => {
      const order = selectors.getOrderById(this.data, id);
      const user = selectors.getUserByOrderId(this.data, id);
      const filterData = getFilterData({ user, order });
      return contain(query, filterData);
    });
  }

  sortOrders(column) {
    const sortedIds = sorter(this.data.orders.allIds, this.data, column);
    this.data.orders.allIds = sortedIds;
  }
}
