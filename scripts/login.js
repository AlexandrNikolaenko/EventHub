// форма входа

import { login } from "./api.js";

const formLogin = document.getElementById('login');

function handleSubmit(e) {
  e.preventDefault();
  const values = e.target.value;
  
}

formLogin.addEventListener('submit', handleSubmit)