import { fuse } from './db.js';
import { searcherTemplate, cardTemplate } from './templates.js';

class SearchCards extends HTMLElement {
  constructor() {
    super();
    this.results = "";
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(searcherTemplate.content.cloneNode(true));

    this.setResults = this.setResults.bind(this);
    this.debounce = this.debounce.bind(this);

    this.searchBar = this.shadowRoot.querySelector("#search-bar");
    this.itemCards = this.shadowRoot.querySelector("#item-cards");
  }

  setResults() {
    this.results = fuse.search(this.searchBar.value);

    this.itemCards.innerHTML = `
      <style>
        .item-cards {
          display: flex;
          flex-direction: row;
          align-items: stretch;
        }
      </style>
      <div class="item-cards">
    `;
    this.results.forEach(result => {
      this.itemCards.innerHTML += `
        <item-card
          name=${result.item.name}
          brand=${result.item.brand}
          picture=${result.item.picture}
          specs=${result.item.specs}
          price=${result.item.price}
        >
        </item-card>
      `;
    });
    this.itemCards.innerHTML += "</div>";
  }

  debounce(func, wait) {
    let timeout;
    return (...args) => {
      const later = () => {
        timeout = null;
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    }
  }

  connectedCallback() {
    this.shadowRoot.addEventListener("input", this.debounce(this.setResults, 300));
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("input", null);
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
    this.shadowRoot.querySelector('#toggle-info').removeEventListener('click', null);
  }
}

class StarRating extends HTMLElement {
  constructor() {
    super();
    this.number = this.number;

    this.shadowRoot.addEventListener('mousemove', e => {
      let box = this.getBoundingClientRect(),
        starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);
      this.highlight(starIndex);
    });

    this.shadowRoot.addEventListener('mouseout', () => {
      this.value = this.value;
    });

    this.shadowRoot.addEventListener('click', e => {
      let box = this.getBoundingClientRect(),
        starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);

      this.value = starIndex + 1;

      let rateEvent = new Event('rate');
      this.shadowRoot.dispatchEvent(rateEvent);
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
    this.attachShadow({ mode: 'open' });
    this.setAttribute('number', val);
    this.stars = [];

    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild);
    }
    
    for (let i = 0; i < this.number; i++) {
      let s = document.createElement('div');
      s.className = 'star';
      this.shadowRoot.appendChild(s);
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

window.customElements.define('retail-app', SearchCards);
window.customElements.define('item-card', ItemCard);
window.customElements.define('x-star-rating', StarRating);
