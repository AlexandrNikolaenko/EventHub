class Store {
  constructor (users) {
    this.users = users
  }

  initStrore() {
    const users = JSON.parse(localStorage.getItem('users'));
    if (users) return new Store(users);
    else return new Store([]);
  }

  setUser(user) {
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}

class User {
  constructor (name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}


export const store = Store.initStrore();


export function login({password, email}) {
  const user = store.users.find(elem => elem.email == email)
  if (user) {
    if (user.password == password) {
      const user = JSON.parse(localStorage.getItem('users'))[email]
      localStorage.setItem('activeUser', user);
      window.location.href('./main.html');
      return ;
    } else {
      return new Error("{type: 'password', message: 'Неверный пароль'}")
    }
  } else {
    return new Error("{type: email, message: 'Пользователя с такой почтой не существует'}")
  }
}

export function register({name, email, password }) {
  const checkUser = store.users.find(user => user.email == email);
  if (checkUser) {
    return new Error("{type: email, message: 'Пользовательс такой почтой уже существует'}")
  } else {
    store.setUser({name, email, password });
  }
}