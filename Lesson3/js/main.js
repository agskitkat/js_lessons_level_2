const api = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

class ProductList {
    constructor(container = '.products') {
        this.api = api;
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts()
            .then(() => {
                return this._render();
            })
            .then(() => {
                // Вешаем события на кнопки добавить в корзину
                // Где логичнее вешать событите ?
                for (let item of document.querySelector(this.container).querySelectorAll('.buy-btn')) {
                    item.addEventListener('click', (event) => {
                        cart.addProduct(this._getProductById(item.getAttribute('data-id'))).then(result => console.log(result));
                    });
                }
            });
    }

    _fetchProducts() {
        return new Promise((resolve, reject) => {
            fetch(this.api + 'catalogData.json')
                .then(response => response.json())
                .then(goods => {
                    this.goods = goods;
                    resolve();
                });
        });

    }

    _render() {
        return new Promise((resolve, reject) => {
            const block = document.querySelector(this.container);
            for (let product of this.goods) {
                const productObject = new ProductItem(product);
                this.allProducts.push(productObject);
                block.insertAdjacentHTML('beforeend', productObject.render())
            }
            resolve();
        });
    }

    _getProductById(id) {
        return this.goods.find(item => item.id_product === +id);
    }

    getTotalSum() {
        let totalSum = 0;
        for (let good of this.goods) {
            totalSum += good.price;
        }
        console.log(totalSum);
        return totalSum;
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        return `<div class="product-item">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn" data-id="${this.id}">Купить</button>
                </div>
            </div>`;
    }
}

/**
 * Класс описывающий корзину
 */
class Cart {

    constructor() {
        this.api = api;
        this.inCart = [];

    }

    /**
     * Добавление товара в корзину
     */
    addProduct(productItem) {
        return new Promise((resolve, reject) => {
            fetch(this.api + 'addToBasket.json')
                .then(response => response.json())
                .then(status => {
                    if (status.result) {
                        let inCartItem = this.isInCart(productItem.id_product);
                        console.log(inCartItem);
                        if(!inCartItem) {
                            this.inCart.push(new CartItem(productItem));
                        } else {
                            inCartItem.quantity++;
                        }
                        resolve('Товар добавлен');
                        this.calcSum();
                        this.render();
                    } else {
                        reject('При добавлении товара возникла ошибка');
                    }
                });
        });
    }

    /**
     * Удаляет товар из корзины
     */
    removeProduct(id) {
        return new Promise((resolve, reject) => {
            fetch(this.api + 'deleteFromBasket.json')
                .then(response => response.json())
                .then(status => {
                    if (status.result) {
                        let element = this.inCart.find(item => item.id === +id);
                        let index = this.inCart.indexOf(element);
                        this.inCart.splice(index, 1);
                        resolve('Товар удалён');
                    } else {
                        reject('При удалении товара возникла ошибка');
                    }
                });
        });
    }

    /**
     * Считает сумму товаров в корзине
     */
    calcSum() {
        let totalSum = 0;
        for (let product of this.inCart) {
            let quantity = product.quantity ? product.quantity : 1;
            totalSum += product.price * quantity;
        }
        console.log(totalSum);
        return totalSum;
    }

    /**
     * Получить все товары корзины
     */
    getProducts() {
        for (let product of this.inCart) {

        }
    }

    /**
     * Обновление списка корзины
     */
    render() {
        let cart = document.querySelector('#cart-list');
        cart.innerHTML = '';

        for (let product of this.inCart) {
            cart.insertAdjacentHTML('afterend', product.render());
        }
    }

    isInCart(id) {
        return this.inCart.find(item => item.id === +id);
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
        this.id = productItem.id_product;
        this.name = productItem.product_name;
        this.price = productItem.price;
        this.quantity = quantity;
    }

    /**
     * Возвращает HTML код товара корзиный
     * @return {String} HTML код.
     */
    render() {
        return `<button class="mini-cart__item">${this.name} ${this.price} <button data-id="${this.id}">Remove</button></div>`
    }

}

const list = new ProductList();
const cart = new Cart();