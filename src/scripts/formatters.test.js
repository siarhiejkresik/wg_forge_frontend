import * as formatters from './formatters';

describe('Format order data', () => {
  describe('format order id for <tr> id', () => {
    const { trOrderId } = formatters;
    it('should return formatted id for <tr> tag', () => {
      expect(trOrderId(10)).toBe('order_10');
    });
  });

  describe('format order date from unix time to `DD/MM/YYYY hh:mm:ss`', () => {
    const { orderDate } = formatters;
    // TODO: time zone offset, test is broken when UTC offset is not +3
    it('should return formatted date', () => {
      expect(orderDate(0)).toBe('01/01/1970 03:00:00');
    });
  });

  describe('format order location', () => {
    const { orderLocation } = formatters;
    it('should return formatted order location', () => {
      expect(orderLocation('COUNTRY', '123.234.345.456')).toBe('COUNTRY (123.234.345.456)');
    });
  });
});

describe('Format card data', () => {
  describe('format card number', () => {
    const { cardNumberEscaped } = formatters;
    it('should return formatted card number', () => {
      expect(cardNumberEscaped('123456789')).toBe('12***6789');
    });
    it('should return original number when card number has lenght 6', () => {
      expect(cardNumberEscaped('123456')).toBe('123456');
    });
    it('should return original number when card number has length lesser then 6', () => {
      expect(cardNumberEscaped('123')).toBe('123');
    });
  });
});

describe('Format user dataname', () => {
  describe('format user name', () => {
    const { userName } = formatters;
    it('should return formatted string for male', () => {
      expect(userName('First', 'Second', 'Male')).toBe('Mr. First Second');
    });
    it('should return formatted string for not male', () => {
      expect(userName('First', 'Second')).toBe('Ms. First Second');
    });
  });

  describe('format user birthday to `DD/MM/YYYY`', () => {
    const { userBirthday } = formatters;
    it('should return formatted birthday', () => {
      expect(userBirthday(0)).toBe('01/01/1970');
    });
    it('should return formatted birthday', () => {
      expect(userBirthday(1000000000000)).toBe('09/09/2001');
    });
    it('should return formatted birthday when time is string', () => {
      expect(userBirthday('0')).toBe('01/01/1970');
    });
    it('should return formatted birthday when time is string', () => {
      expect(userBirthday('1000000000000')).toBe('09/09/2001');
    });
  });
});
