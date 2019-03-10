import { COLUMNS_ORDER } from '../config';

export default function() {
  const tbody = document.createElement('tbody');
  tbody.id = 'no_found';
  tbody.hidden = true;

  const tr = tbody.insertRow();
  const td = tr.insertCell();
  td.colSpan = COLUMNS_ORDER.length;
  td.textContent = 'Nothing found';

  return tbody;
}
