import { store, user } from "./api.js";

if (!user.getUser().email) window.location.assign('./login.html');


function handleRemoveEvent(e, id) {
  e.preventDefault();
  store.deleteEvents(id);
  loadEvents();
}

function loadEvents(search) {
  let events = store.getEvents();

  if (search) {
    events = events.filter(event => event.title.include(search))
  }

  const list = document.getElementById('events-list')
  list.innerHTML = '';

  if (events.legth != 0) {
    document.getElementById('events__empty').classList.add('hide');
    list.classList.remove('hide');
    const eventTemplate = document.getElementById('event-card-template').content;

    events.forEach(event => {
      const eventCard = eventTemplate.cloneNode(true);
      eventCard.querySelector('.card-media').style.background = `url(${event.image || './public/theatre.jpg'})`
      eventCard.querySelector('.card-header').textContent = event.title;
      eventCard.querySelector('.event-author').textContent = event.author;
      eventCard.querySelector('.event-description').textContent = event.desc;
      eventCard.querySelector('.event-date').textContent = event.date;
      eventCard.querySelector('.event-place').textContent = event.place;
      const link = eventCard.querySelector('.event-button');
      link.setAttribute('href', `./event.html?id=${event.id}`);
      eventCard.querySelector('.remove-button').addEventListener('click', (e) => handleRemoveEvent(e, event.id));
      list.appendChild(eventCard);
    })
  }
}

loadEvents();

// Поиск событий

function handleSearch(e) {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  loadEvents(formData.search)
}

document.getElementById('search-form').addEventListener('submit', handleSearch);

// открытие и закрытие формы создания события

function handleOpenCreatorModal(e) {
  e.preventDefault();
  document.getElementById('create-event-modal').classList.add('active');
}

function handleCloseCreatorModal(e) { 
  e.preventDefault();
  document.getElementById('create-event-modal').classList.remove('active');
}

document.getElementById('close-cretor-modal').addEventListener('click', handleCloseCreatorModal);
document.querySelector('.create-event').addEventListener('click', handleOpenCreatorModal)

// открытие формы генерации события

function handleOpenGeneratorModal(e) {
  e.preventDefault();
  document.getElementById('generate-event-modal').classList.add('active');
}

function handleCloseGeneratorModal(e) { 
  e.preventDefault();
  document.getElementById('generate-event-modal').classList.remove('active');
}

document.getElementById('close-generator-modal').addEventListener('click', handleCloseGeneratorModal);
document.querySelector('.gen-event').addEventListener('click', handleOpenGeneratorModal)

// обработка формы создания события

let users = [];

function setError(field) {
  document.getElementById(field+'-error').classList.add('active');
}

function clearErrors(keys) {
  keys.forEach(key => {
    document.getElementById(key+'-error').classList.remove('active');
  })
}

function validateFormCreate(event) {
  const keys = Object.keys(event).filter(key => key != 'users');
  let errors = []
  keys.forEach(key => {
    if (event[key] == '') {
      setError(key);
      errors.push(key);
    }
  });
  clearErrors(keys.filter(key => !errors.includes(key)));
  if (errors.length == 0) return true;
  else return false;
}

function handleCreateEvent(e) {
  e.preventDefault();
  const event = Object.fromEntries(new FormData(e.target));
  if (validateFormCreate(event)) {
    event.users = users;
    store.setEvents(event);
    document.getElementById('create-event-modal').classList.remove('active');
    loadEvents();
  }
}

document.getElementById('create-event-form').addEventListener('submit', handleCreateEvent);

// выбор пользователей

function handleAddUser(e, email) {
  e.preventDefault();

  const activeUsersList = document.getElementById("users-active-list");

  const activeUserTemplate = document.getElementById('active-user-template').content;
  console.log(activeUserTemplate.querySelector('li'));

  const activeUser = activeUserTemplate.querySelector('li').cloneNode(true);
  console.log(activeUser);
  activeUser.querySelector('span').textContent = email;
  activeUser.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault();
    activeUsersList.removeChild(activeUser);
    users = users.filter(elem => elem != email);
  });
  if (!Array.from(activeUsersList.childNodes).includes(activeUser)) {
    activeUsersList.appendChild(activeUser);
    users.push(email);
  }
}

function setUsers(search) {
  const usersList = document.getElementById('users-list');
  usersList.innerHTML = '';
  let newUsers
  if (search) newUsers = store.users.filter(elem => elem.email.includes(search)).map(elem => elem.email);
  else newUsers = store.users.map(elem => elem.email);

  const userTemplate = document.getElementById('user-template').content;

  newUsers.forEach(email => {
    const userBlock = userTemplate.cloneNode(true);
    userBlock.querySelector('button').textContent = email;
    userBlock.querySelector('button').addEventListener('click', (e) => handleAddUser(e, email));
    usersList.appendChild(userBlock);
  });
}

function handleChangeUsersInput(e) {
  const usersList = document.getElementById('users-list');
  if (e.target.value != '') {
    usersList.classList.remove('hide');
    setUsers();
  } else {
    usersList.classList.add('hide');
    usersList.innerHTML == '';
  }
}

document.getElementById('users').addEventListener('input', handleChangeUsersInput);
