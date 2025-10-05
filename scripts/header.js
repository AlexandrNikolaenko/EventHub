import { user } from "./api";

// мобильное меню

const menuButton = document.getElementById('menu-bar');
const menuList = document.getElementById('header__menu__list');

function handleChangeVisible() {
  menuList.classList.toggle('enable');
  menuList.classList.toggle('disable');
}

menuButton.addEventListener('click', handleChangeVisible);

// вход в аккаунт пользователя

console.log(user);

if (user.email) {
  const links = document.getElementsByClassName('my-events');
  Array.from(links).forEach(link => {
    link.classList.add('active');
  });
}