import { compare } from './common';
import { COLUMNS, COLUMNS_DESCRIPTORS } from '../config';

const userSelector = selector => (...args) => {
  const { user } = selector(...args);
  const firstName = user.first_name;
  const lastName = user.last_name;
  return [firstName, lastName];
};

const locationSelector = selector => (...args) => {
  const { country, ip } = selector(...args);
  return [country, ip];
};

const customSelectors = {
  [COLUMNS.userInfo]: userSelector,
  [COLUMNS.location]: locationSelector,
};

const comparator = (data, selector, sortType) => (id1, id2) => {
  let values = [id1, id2].map(id => selector(data, id));

  switch (sortType) {
    case 'number':
      values = values.map(Number);
      break;
    default:
      values = values.map(String);
  }

  const [v1, v2] = values;
  return compare(v1, v2);
};

export const buildComparator = (data, column) => {
  const { sortType } = COLUMNS_DESCRIPTORS[column];

  let { selector } = COLUMNS_DESCRIPTORS[column];
  const customSelector = customSelectors[column];
  if (customSelector) {
    selector = customSelector(selector);
  }

  return comparator(data, selector, sortType);
};

export const sorter = (ids, data, column) => {
  const comparatorFn = buildComparator(data, column);
  const arr = Array.from(ids);
  return arr.sort(comparatorFn);
};
