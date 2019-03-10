import { number, currency } from '../scripts/formatters';
import { COLUMNS_ORDER } from '../config';

const mapStats = stats => [
  {
    title: 'Orders Count',
    key: stats.ordersCount,
  },
  {
    title: 'Orders Total',
    key: stats.ordersTotal,
    formatters: [number, currency],
  },
  {
    title: 'Median Value',
    key: stats.medianValue,
    formatters: [number, currency],
  },
  {
    title: 'Average Check',
    key: stats.averageCheck.total,
    formatters: [number, currency],
  },
  {
    title: 'Average Check (Female)',
    key: stats.averageCheck.female,
    formatters: [number, currency],
  },
  {
    title: 'Average Check (Male)',
    key: stats.averageCheck.male,
    formatters: [number, currency],
  },
];

export default function(stats) {
  const data = mapStats(stats);

  const tfoot = document.createElement('tfoot');

  data.forEach(stat => {
    const tr = document.createElement('tr');

    // title cell
    const tdTitle = tr.insertCell();
    tdTitle.textContent = stat.title;
    tdTitle.colSpan = COLUMNS_ORDER.length - 1;
    tdTitle.classList = 'text-left';

    // value cell
    const tdValue = tr.insertCell();

    // value cell text content
    let textContent;
    // eslint-disable-next-line no-underscore-dangle
    if (stat.key === null || stats._noVisibleIds === true) {
      textContent = 'n\\a';
    } else if (stat.formatters) {
      textContent = stat.formatters.reduce((acc, formatter) => formatter(acc), stat.key);
    } else {
      textContent = stat.key;
    }

    tdValue.textContent = textContent;

    tdValue.classList = 'text-right';

    tfoot.appendChild(tr);
  });

  return tfoot;
}
