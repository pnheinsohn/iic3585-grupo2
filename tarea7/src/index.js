import items from './db';

const template = document.createElement('template');
template.innerHTML = `
  <style>
  .item-cards {
    display: flex;
  }

  .item-card {
		font-family: 'Arial', sans-serif;
		background: #f4f4f4;
    width: 200px;
    height: 150px;
    display: inline-block;
    margin-bottom: 15px;
    margin-top: 10px;
		border-bottom: darkorchid 5px solid;
  }

	.item-card img {
    width: 100%;
    height: 200px;
	}

	.item-card button {
		cursor: pointer;
		background: darkorchid;
		color: #fff;
		border: 0;
		border-radius: 5px;
    padding: 5px 10px;
  }
  
  .brand {
    color: #808080;
  }

  .rating {
    display: none;
  }

  </style>
  <div class="item-card">
    <img />
    <div>
      <p class="brand"></P>
      <h3></h3>      
      <div class="info">
        <p><slot name="specs" /></p>
        <p><slot name="price" /></p>
      </div>
      <div class="rating">
        <x-star-rating value="3" number="5"></x-star-rating>
        <p>Aquí deberían ir las estrellas</p>
      </div>
      <button id="toggle-info">Rating</button>
    </div>
    
  </div>
`;

class ItemCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('.brand').innerText = this.getAttribute('brand');
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('picture');
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector('.info');
    const rating = this.shadowRoot.querySelector('.rating');
    const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

    if(this.showInfo) {
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

window.customElements.define('item-card', ItemCard);


class StarRating extends HTMLElement {
  get value () {
      return this.getAttribute('value') || 0;
  }

  set value (val) {
      this.setAttribute('value', val);
      this.highlight(this.value - 1);
  }

  get number () {
      return this.getAttribute('number') || 5;
  }

  set number (val) {
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

  highlight (index) {
      this.stars.forEach((star, i) => {
          star.classList.toggle('full', i <= index);
      });
  }

  constructor () {
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
}

window.customElements.define('x-star-rating', StarRating);