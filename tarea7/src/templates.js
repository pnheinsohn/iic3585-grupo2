export const searcherTemplate = document.createElement('template');
searcherTemplate.innerHTML = `
  <style>
    #search-bar {
      margin: 10px;
      margin-left: 10px;
      width: 190px;
      border-radius: 5px;
    }
  </style>
  <input id="search-bar" type="text" placeholder="Busca un producto">
  <div id="item-cards">
  </div>
`;

export const cardTemplate = document.createElement('template');
cardTemplate.innerHTML = `
  <style>
  .item-card {
    display: inline-block;
    justify-content: center;
    align-items: center;
		font-family: 'Arial', sans-serif;
		background: #f4f4f4;
    width: 200px;
    height: 400px;
    margin-bottom: 15px;
    margin-top: 10px;
    margin-left: 10px;
    border-bottom: darkorchid 5px solid;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 10px;
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
    <p class="brand"></P>
    <h3></h3>
    <div class="info">
      <p class="specs"/></p>
      <p class="price"/></p>
    </div>
    <div class="rating">
      <p>Rating:</p>
      <x-star-rating class="x-star-rating" value="3" number="5"></x-star-rating>
      <p>*******</p>
      </div>
    <button id="toggle-info">Rating</button>
  </div>
`;