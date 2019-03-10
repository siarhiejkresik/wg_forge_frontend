import * as selectors from '../scripts/selectors';

export const COLUMNS = {
  transactionId: 'transactionId',
  userInfo: 'userInfo',
  orderDate: 'orderDate',
  orderAmount: 'orderAmount',
  cardNumber: 'cardNumber',
  cardType: 'cardType',
  location: 'location',
};

export const COLUMNS_ORDER = [
  COLUMNS.transactionId,
  COLUMNS.userInfo,
  COLUMNS.orderDate,
  COLUMNS.orderAmount,
  COLUMNS.cardNumber,
  COLUMNS.cardType,
  COLUMNS.location,
];

export const COLUMNS_DESCRIPTORS = {
  [COLUMNS.transactionId]: {
    title: 'Transaction ID',
    classes: '',
    sortable: true,
    selector: selectors.getOrderValueByKey('transaction_id'),
  },
  [COLUMNS.userInfo]: {
    title: 'User info',
    classes: '',
    sortable: true,
    selector: selectors.getUserInfoByOrderId,
  },
  [COLUMNS.orderDate]: {
    title: 'Order Date',
    classes: '',
    sortable: true,
    sortType: 'number',
    selector: selectors.getOrderValueByKey('created_at'),
  },
  [COLUMNS.orderAmount]: {
    title: 'Order Amount',
    classes: '',
    sortable: true,
    sortType: 'number',
    selector: selectors.getOrderValueByKey('total'),
  },
  [COLUMNS.cardNumber]: {
    title: 'Card Number',
    classes: '',
    sortable: false,
    selector: selectors.getOrderValueByKey('card_number'),
  },
  [COLUMNS.cardType]: {
    title: 'Card Type',
    classes: '',
    sortable: true,
    selector: selectors.getOrderValueByKey('card_type'),
  },
  [COLUMNS.location]: {
    title: 'Location',
    classes: '',
    sortable: true,
    sortType: 'string',
    selector: selectors.getLocationInfoByOrderId,
  },
};
