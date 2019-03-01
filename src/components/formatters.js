function prependIntWithNulls(n, digitsNum = 2) {
  return parseInt(n, 10).toLocaleString('en-US', {
    minimumIntegerDigits: digitsNum,
    useGrouping: false,
  });
}

export function trOderId(id) {
  return `order_${id}`;
}

function parseUnixTime(unixTime) {
  const date = new Date(parseInt(unixTime, 10));

  const YYYY = date.getFullYear();
  let DD = date.getDate();
  let MM = date.getMonth() + 1;
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  [DD, MM, hh, mm, ss] = [DD, MM, hh, mm, ss].map(el => prependIntWithNulls(el));
  return { YYYY, DD, MM, hh, mm, ss };
}

export function orderDate(unixTime) {
  const date = parseUnixTime(unixTime);
  const { YYYY, DD, MM, hh, mm, ss } = date;
  return `${DD}/${MM}/${YYYY} ${hh}:${mm}:${ss}`;
}

export function orderLocation(country, ip) {
  return `${country} (${ip})`;
}

const visibleCharCount = {
  start: 2,
  end: 4,
};
const hiddenChar = '*';

export function cardNumberEscaped(cardNumber) {
  const { start, end } = visibleCharCount;

  const { length } = cardNumber;
  if (length <= Math.max(start, end)) {
    return cardNumber;
  }

  const hiddenCharCount = length - start - end;

  const newCardNumber = Array.from(cardNumber);
  newCardNumber.splice(start, hiddenCharCount, hiddenChar.repeat(hiddenCharCount));

  return newCardNumber.join('');
}

export function userName(firstName, lastName, gender) {
  let prefix = 'Ms.';
  if (gender === 'male') {
    prefix = 'Mr.';
  }
  return `${prefix} ${firstName} ${lastName}`;
}

export function userBirthday(unixTime) {
  const date = parseUnixTime(unixTime);
  const { DD, MM, YYYY } = date;
  return `${DD}/${MM}/${YYYY}`;
}
