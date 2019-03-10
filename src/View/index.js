import Presenter from '../Presenter';
import Table from '../components/Table';
import Stats from '../components/Stats';

import { trOrderId } from '../scripts/formatters';

export default class {
  constructor(id) {
    this.id = id;
    this.presenter = new Presenter(this);
  }

  init(data, stats) {
    this.render(data, stats);
    this.addEventListeners();
  }

  addEventListeners() {
    const search = document.getElementById('search');
    search.addEventListener('change', this.onSearch.bind(this));

    const thead = document.querySelector(`#${this.id} thead`);
    thead.addEventListener('click', this.onSort.bind(this));
  }

  render(data, stats) {
    const rootNode = document.getElementById(this.id);
    rootNode.innerHTML = '';
    const table = Table(data, stats);
    rootNode.appendChild(table);
  }

  // eslint-disable-next-line class-methods-use-this
  updateRowsVisibility(visibleIds) {
    const formattedIds = visibleIds.map(id => trOrderId(id));
    const rows = document.querySelectorAll("[id^='order_']");
    // const rows = document.querySelectorAll(`#${this.id} tbody tr`);
    rows.forEach(row => {
      if (formattedIds.includes(row.id)) {
        row.hidden = false; // eslint-disable-line no-param-reassign
      } else {
        row.hidden = true; // eslint-disable-line no-param-reassign
      }
    });
  }

  updateStats(stats) {
    const foot = document.querySelector(`#${this.id} tfoot`);
    foot.parentNode.replaceChild(Stats(stats), foot);
  }

  // eslint-disable-next-line class-methods-use-this
  sortRows(ids) {
    if (!ids) {
      return;
    }

    const fragment = document.createDocumentFragment();
    ids.forEach(id => {
      const row = document.getElementById(trOrderId(id));
      if (row !== null) {
        fragment.appendChild(row);
      }
    });

    const tbody = document.getElementById('orders');
    // const tbody = document.querySelector(`#${this.id} tbody`);
    tbody.innerHTML = '';
    tbody.appendChild(fragment);
  }

  setSortArrow(column) {
    const th = document.querySelectorAll(`#${this.id} th[data-sortable]`);
    th.forEach(node => {
      // eslint-disable-next-line no-unused-expressions
      node.dataset.sortable === column
        ? node.classList.add('sorted')
        : node.classList.remove('sorted');
    });
  }

  // eslint-disable-next-line class-methods-use-this
  toggleNothingFound(flag) {
    const nothing = document.getElementById('no_found');
    nothing.hidden = !flag;
  }

  onSearch(e) {
    const { value } = e.target;
    this.presenter.handleFilter(value);
  }

  onSort(e) {
    const th = e.target.closest('th[data-sortable]');
    if (!th) {
      return;
    }

    const column = th.dataset.sortable;
    if (column) {
      this.presenter.handleSort(column);
    }
  }
}
