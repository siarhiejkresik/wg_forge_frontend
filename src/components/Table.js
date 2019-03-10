import Head from './Head';
import Body from './Body';
import NothingFound from './NothingFound';
import Stats from './Stats';

export default function(data, stats) {
  const table = document.createElement('table');
  table.className = 'table table-sm text-center';

  const head = Head();
  const body = Body(data);
  const nothing = NothingFound();
  const foot = Stats(stats);

  table.appendChild(head);
  table.appendChild(body);
  table.appendChild(nothing);
  table.appendChild(foot);

  return table;
}
