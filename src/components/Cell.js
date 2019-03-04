// console.log(template);

export default function Cell(text, formatter) {
  const td = document.createElement('td');

  if (text === undefined) {
    return td;
  }

  const textContent = formatter ? formatter(text) : text;

  td.textContent = textContent;
  return td;
}
