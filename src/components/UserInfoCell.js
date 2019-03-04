import UserDetails from './UserDetails';
import { userName as formatUserName } from '../scripts/formatters';

function userNameLink(user) {
  const { first_name } = user; // eslint-disable-line camelcase
  const { last_name } = user; // eslint-disable-line camelcase
  const { gender } = user;

  const name = formatUserName(first_name, last_name, gender);

  const a = document.createElement('a');
  a.href = '#';
  a.textContent = name;
  a.className = 'data-user-link';

  return a;
}

export default function UserInfoCell(user, company) {
  const td = document.createElement('td');
  td.classList.add('user-data');

  td.appendChild(userNameLink(user));

  const userDetails = UserDetails(user, company);
  userDetails.hidden = true;
  td.appendChild(userDetails);

  return td;
}
