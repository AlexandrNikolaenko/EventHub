// форма регистрации

import { register } from "./api.js";

const formRegister = document.getElementById('register');

function validation (values) {
  let errors = [];
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
    errors.push({type: 'email', message: "Некорректная почта"})
  }
  if (values.password.length < 8) {
    errors.push({type: 'password', message: "Пароль должен содержать не менее 8 символов"})
  }
  if (values.password != values.repassword) {
    errors.push({type: 'repassword', message: "Пароли должны совпадать"})
  }
  return errors;
}

function initState() {
  const messages = document.getElementsByTagName('span');
  
  Array.from(messages).forEach(message => {
    message.classList.remove('active');
  })
}

function handleSubmit(e) {
  e.preventDefault();
  initState();
  const values = Object.fromEntries(new FormData(e.target));
  const errors = validation(values);
  if (errors.length != 0) {
    errors.forEach((error) => {
      const message = document.getElementById(error.type + '-error');
      message.classList.add('active');
      message.textContent(error.message);
    })
  } else {
    try {
      register(values);
    } catch(err) {
      try {
        const error = JSON.parse(err.message);
        const message = document.getElementById(error.type + '-error');
        message.classList.add('active');
        message.textContent(error.message);
      } catch(e) {
        console.log(e);
      }
    }
  }
}

formRegister.addEventListener('submit', handleSubmit)