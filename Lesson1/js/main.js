const products = [
  {id: 1, title: 'Notebook', price: 1000},
  {id: 2, title: 'Mouse', price: 100},
  {id: 3, title: 'Keyboard', price: 250},
  {id: 4, title: 'Gamepad', price: 150},
  {id: 5},
];

const renderProduct = (title = "No name", price = 0) => {
  return `<div class="product-item">
            <h3>${title}</h3>
            <p>${price}$</p>
            <button class="by-btn">Добавить</button>
          </div>`;
};

const renderProducts = list => {
  document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
  // Метод map() создаёт новый массив. innerHTML принимает массив, и что логично делает из него строку, методом toString()
  // Лучшее решение объединить полученый массив в строку методом .join(''), без указания сепаратора.
};

renderProducts(products);
