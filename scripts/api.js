class Store {
  constructor (users) {
    this.users = users
  }

  static initStore() {
    const users = JSON.parse(localStorage.getItem('users'));
    if (users) return new Store(users);
    else return new Store([]);
  }

  setUser(user) {
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getUserByEmail(email) {
    return this.users.find(user => user.email == email);
  }
}

class User {
  constructor () {
    this.name;
    this.email;
    this.password;
  }

  updateUser(email) {
    window.localStorage.setItem('activeUser', email);
    const user = store.getUserByEmail(email);
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
  } 

  deleteUser() {
    [this.name, this.email, this.password] = [undefined, undefined, undefined];
    window.localStorage.removeItem('activeUser');
  }

  static initUser() {
    const newUser = new User();
    if (window.localStorage.getItem('activeUser')) {
      newUser.updateUser(window.localStorage.getItem('activeUser'));
    }
    return newUser
  }
}


export const store = Store.initStore();
export const user = User.initUser();


export function login({password, email}) {
  console.log(email);
  const newUser = store.users.find(elem => elem.email == email);
  if (newUser) {
    if (newUser.password == password) {
      user.updateUser(email);
      console.log('here');
      window.location.assign('http://eventhub/main.html');
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
    return new Error("{type: email, message: 'Пользователь с такой почтой уже существует'}")
  } else {
    store.setUser({name, email, password });
    user.updateUser(email)
    window.location.assign('http://eventhub/main.html')
    return;
  }
}