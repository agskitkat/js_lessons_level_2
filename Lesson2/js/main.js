class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._fetchProducts();
    this._render();
    this.getTotalSum();
  }
  _fetchProducts() {
    this.goods = [
      {id: 1, title: 'Notebook', price: 1000},
      {id: 2, title: 'Mouse', price: 100},
      {id: 3, title: 'Keyboard', price: 250},
      {id: 4, title: 'Gamepad', price: 150},
    ]
  }
  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render())
    }
  }
  getTotalSum() {
    let totalSum = 0;
    for(let good of this.goods) {
      totalSum += good.price;
    }
    console.log(totalSum);
    return totalSum;
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

/**
 * Класс описывающий корзину
 */
class Cart {

  /**
   * Добавление товара в корзину
   */
  addProduct() {

  }

  /**
   * Изменяет количестово товара в корзине
   */
  changeQuantity() {

  }

  /**
   * Удаляет товар из корзины
   */
  removeProduct() {

  }

  /**
   * Считает сумму товаров в корзине
   */
  calcSum() {

  }

  /**
   * Обновление списка корзины
   */
  render() {

  }
}

/**
 * Класс описывающий товар в корзине
 */
class CartItem {
  /**
   * Метод принимает параметры товара
   * @param {ProductItem} productItem экземпляр объекта товара
   * @param {Number}      quantity    количество товара в корзине
   * @this  CartItem
   */
  constructor(productItem, quantity = 1) {

  }

  /**
   * Возвращает HTML код товара корзиный
   * @return {String} HTML код.
   */
  render() {

  }

}

const list = new ProductList();