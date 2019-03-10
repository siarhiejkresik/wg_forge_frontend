export function median(numbers) {
  const len = numbers.length;
  if (len < 2) {
    return null;
  }
  numbers.sort((a, b) => a - b);
  const middle = Math.trunc(len / 2);

  if (len % 2) {
    return numbers[middle];
  }
  return (numbers[middle - 1] + numbers[middle]) / 2;
}

export function compare(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
