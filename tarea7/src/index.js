import {containerTemplate, resultsTemplate, cardTemplate} from './templates.js';

class Container extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(containerTemplate.content.cloneNode(true));
  }
}

class ItemCards extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'});
    this.shadowRoot.appendChild(resultsTemplate.content.cloneNode(true));
  }
}

class ItemCard extends HTMLElement {
  constructor() {
    super();
    this.showInfo = true;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
    this.shadowRoot.querySelector('img').src = this.getAttribute('picture');
    this.shadowRoot.querySelector('.brand').innerText = this.getAttribute('brand');
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('.specs').innerText = this.getAttribute('specs');
    this.shadowRoot.querySelector('.price').innerText = this.getAttribute('price');
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector('.info');
    const rating = this.shadowRoot.querySelector('.rating');
    const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

    if (this.showInfo) {
      info.style.display = 'block';
      rating.style.display = 'none';
      toggleBtn.innerText = 'Rating';
    } else {
      info.style.display = 'none';
      rating.style.display = 'block';
      toggleBtn.innerText = 'Info';
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener();
  }
}


class StarRating extends HTMLElement {
  constructor() {
    super();
    this.number = this.number;

    this.addEventListener('mousemove', e => {
      let box = this.getBoundingClientRect(),
        starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);

      this.highlight(starIndex);
    });

    this.addEventListener('mouseout', () => {
      this.value = this.value;
    });

    this.addEventListener('click', e => {
      let box = this.getBoundingClientRect(),
        starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);

      this.value = starIndex + 1;

      let rateEvent = new Event('rate');
      this.dispatchEvent(rateEvent);
    });
  }

  get value() {
    return this.getAttribute('value') || 0;
  }

  set value(val) {
    this.setAttribute('value', val);
    this.highlight(this.value - 1);
  }

  get number() {
    return this.getAttribute('number') || 5;
  }

  set number(val) {
    this.setAttribute('number', val);

    this.stars = [];

    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }

    for (let i = 0; i < this.number; i++) {
      let s = document.createElement('div');
      s.className = 'star';
      this.appendChild(s);
      this.stars.push(s);
    }

    this.value = this.value;
  }

  highlight(index) {
    this.stars.forEach((star, i) => {
      star.classList.toggle('full', i <= index);
    });
  }
}

window.customElements.define('x-star-rating', StarRating);
window.customElements.define('item-card', ItemCard);
window.customElements.define('item-cards', ItemCards);
window.customElements.define('retail-app', Container);
