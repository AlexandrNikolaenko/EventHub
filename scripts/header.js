import { logout, user } from "./api.js";

// подсвечивание активной страницы

const links = document.getElementsByClassName('nav_link');
const page = document.location.pathname;

console.log(page);
Array.from(links).forEach(link => {
  if (((page == '/' || page == '/index.html') && link.getAttribute('href') == './index.html') || 
  (page == '/main.html' && link.getAttribute('href') == './main.html') ||
  (page == '/about.html' && link.getAttribute('href') == './about.html')
  ) {
    link.classList.add('active');
  }
})

// мобильное меню

const menuButton = document.getElementById('menu-bar');
const menuList = document.getElementById('header__menu__list');

function handleChangeVisible() {
  menuList.classList.toggle('enable');
  menuList.classList.toggle('disable');
}

menuButton.addEventListener('click', handleChangeVisible);

// вход в аккаунт и выход из аккаунта пользователя

if (user.email) {
  const links = document.getElementsByClassName('logout');
  Array.from(links).forEach(link => {
    link.classList.add('active');
    link.addEventListener('click', logout)
  });
  const buttons = document.getElementsByClassName('header__button-enter');
  Array.from(buttons).forEach(button => {
    button.classList.add('hide');
  });
}