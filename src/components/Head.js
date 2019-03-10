import SearchInput from './SearchInput';

import { COLUMNS_ORDER, COLUMNS_DESCRIPTORS } from '../config';

function headerSearchRow() {
  const tr = document.createElement('tr');

  const thLabel = document.createElement('th');
  thLabel.textContent = 'Search:';
  thLabel.className = 'text-right';
  tr.appendChild(thLabel);

  const thSearchInput = document.createElement('th');
  thSearchInput.colSpan = COLUMNS_ORDER.length - 1;
  thSearchInput.appendChild(SearchInput());
  thSearchInput.className = 'text-left';
  tr.appendChild(thSearchInput);

  return tr;
}

function headerTitlesRow() {
  const tr = document.createElement('tr');
  COLUMNS_ORDER.forEach(column => {
    const descriptor = COLUMNS_DESCRIPTORS[column];

    const th = document.createElement('th');
    th.classList = descriptor.classes;
    if (descriptor.sortable === true) {
      th.dataset.sortable = column;
    }

    const span = document.createElement('span');
    span.textContent = descriptor.title;

    th.appendChild(span);
    tr.appendChild(th);
  });

  return tr;
}

export default function() {
  const thead = document.createElement('thead');
  thead.appendChild(headerSearchRow());
  thead.appendChild(headerTitlesRow());
  return thead;
}
