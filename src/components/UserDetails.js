import { userBirthday as formatUserBirthday } from '../scripts/formatters';

const append = container => node => {
  if (node) {
    container.appendChild(node);
  }
};

function userBirthday(birthday) {
  if (birthday === null) {
    return null;
  }
  const p = document.createElement('p');
  p.textContent = `Birthday: ${formatUserBirthday(birthday)}`;
  return p;
}

function userAvatar(avatar) {
  if (avatar === null) {
    return null;
  }
  const img = document.createElement('img');
  img.src = avatar;
  return img;
}

function companyTitle(url, title) {
  const p = document.createElement('p');
  if (url === null) {
    p.innerHTML = `Company: ${title}`;
  } else {
    p.innerHTML = `Company: <a href="${url}">${title}</a>`;
  }
  return p;
}

function companyIndustrySector(industry, sector) {
  const p = document.createElement('p');
  p.textContent = `Industry: ${industry} / ${sector}`;
  return p;
}

export default function({ user, company }) {
  const container = document.createElement('div');
  container.classList.add('user-details');
  const appendToContainer = append(container);

  // user birthday
  const { birthday } = user;
  appendToContainer(userBirthday(birthday));

  // user avatar
  const { avatar } = user;
  appendToContainer(userAvatar(avatar));

  if (!company) {
    return container;
  }

  // company url, title
  const { url, title } = company;
  appendToContainer(companyTitle(url, title));

  // company industry, sector
  const { industry, sector } = company;
  appendToContainer(companyIndustrySector(industry, sector));

  return container;
}
