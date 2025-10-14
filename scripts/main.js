import { store } from "./api.js";

function loadEvents(search) {
  const events = store.getEvents();

  // const fuse = new 

  console.log(events);
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
    })
  }
}

loadEvents();

