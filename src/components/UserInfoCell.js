import UserDetails from './UserDetails';
import { userName as formatUserName } from '../scripts/formatters';

function userNameLink(userData) {
  const { first_name } = userData; // eslint-disable-line camelcase
  const { last_name } = userData; // eslint-disable-line camelcase
  const { gender } = userData;

  const name = formatUserName(first_name, last_name, gender);

  const a = document.createElement('a');
  a.href = '#';
  a.textContent = name;

  return a;
}

export default function UserInfoCell(userData, companyData) {
  const td = document.createElement('td');
  td.classList.add('user-data');

  td.appendChild(userNameLink(userData));

  const userDetails = UserDetails(userData, companyData);
  userDetails.hidden = true;
  td.appendChild(userDetails);

  return td;
}
