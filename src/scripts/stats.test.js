import { ordersTotal } from './stats';

describe('ordersTotal', () => {
  let data;
  beforeEach(() => {
    data = { orders: { byId: {} } };
    data.orders.byId = { 1: { total: 20 }, 2: { total: 30 }, 3: { total: 40 } };
  });
  it('should return correct orders total', () => {
    const ids = Object.keys(data.orders.byId);
    expect(ordersTotal(ids, data)).toBe(90);
  });
  it('should return correct orders total', () => {
    const ids = [2, 3];
    expect(ordersTotal(ids, data)).toBe(70);
  });
});
