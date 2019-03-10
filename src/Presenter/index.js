import Model from '../Model';

export default class {
  constructor(view) {
    this.view = view;
    this.model = new Model();
    this.view.init(this.model.data, this.model.stats);
  }

  handleFilter(query) {
    this.model.applyFilter(query);
    const { visibleIds, stats } = this.model;

    // eslint-disable-next-line no-underscore-dangle
    if (stats._noVisibleIds) {
      this.view.toggleNothingFound(true);
    } else {
      this.view.toggleNothingFound(false);
    }

    this.view.updateRowsVisibility(visibleIds);
    this.view.updateStats(stats);
  }

  handleSort(column) {
    this.model.sortOrders(column);
    const ids = this.model.data.orders.allIds;

    this.view.sortRows(ids);
    this.view.setSortArrow(column);
  }
}
