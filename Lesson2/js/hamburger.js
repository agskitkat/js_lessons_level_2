class HamburgerForm {
    constructor() {
        this.typeSelectId = '#type';
        this.fillingSelectId = '#filling';
        this.spiceSelectId = '#spice';
        this.calcButtonId = "#calc";

        this.selectType = document.querySelector(this.typeSelectId);
        this.selectFillings = document.querySelector(this.fillingSelectId);
        this.selectSpice = document.querySelector(this.spiceSelectId);

        this._fetchData();
        this._buildForm();

        document.querySelector(this.calcButtonId).addEventListener('click',() => {this.createHamburger()})
    }

    /**
     * Получаем данные о гамбургерах и начинках
     */
    _fetchData() {
        this.types = [
            {name: 'Маленький', price: 50, calories: 20},
            {name: 'Большой', price: 100, calories: 40},
        ];

        this.fillings = [
            {name: 'С сыром', price: 10, calories: 20},
            {name: 'С салатом', price: 20, calories: 5},
            {name: 'С картофелем', price: 15, calories: 10},
        ];

        this.spices = [
            {name: 'Посыпать приправой', price: 15, calories: 0},
            {name: 'Полить майонезом', price: 20, calories: 5},
        ];
    }

    /**
     * Заполняем поля формы данными
     */
    _buildForm() {
        let i = 0;
        for(let type of this.types) {
            this.selectType.insertAdjacentHTML('beforeend', HamburgerForm._optionRender(i++, type.name));
        }

        i = 0;
        for(let type of this.fillings) {
            this.selectFillings.insertAdjacentHTML('beforeend', HamburgerForm._optionRender(i++, type.name));
        }

        i = 0;
        for(let type of this.spices) {
            this.selectSpice.insertAdjacentHTML('beforeend', HamburgerForm._checkboxSpiceRender(i++, type.name));
        }
    }

    static _optionRender(id, name) {
        return `<option value="${id}">${name}</option>`;
    }

    static _checkboxSpiceRender(id, name) {
        return `<input type="checkbox" name="spice" data-id="${id}"><label>${name}</label>`;
    }

    createHamburger() {
        let typeId = this.selectType.value;
        let fillingId = this.selectFillings.value;
        let spices = [];
        let checkboxes = this.selectSpice.querySelectorAll('input');
        for(let checkbox of checkboxes) {
            if(checkbox.checked) {
                spices.push(this.spices[+checkbox.getAttribute('data-id')]);
            }
        }

        let myHamburger = new Hamburger( this.types[typeId],  this.fillings[fillingId], spices);

        document.querySelector("#fullname").innerHTML = myHamburger.getFullName();
        document.querySelector("#price").innerHTML = 'Цена: '+myHamburger.getPrice() + ' руб.';
        document.querySelector("#calories").innerHTML = 'Калорийность: '+myHamburger.getCalories() + ' ккал.';


    }
}

let h = new HamburgerForm();


class Hamburger {
    constructor(type, filling, spices = []) {
        this.type = type;
        this.filling = filling;
        this.spices = spices;
    }

    getPrice() {
        let price = 0;
        price += this.filling.price;
        price += this.type.price;
        if(this.spices.length) {
            for(let spice of this.spices) {
                price += +spice.price;
            }
        }

        return price;
    }

    getCalories() {
        let calories = 0;
        calories += this.filling.calories;
        calories += this.type.calories;
        if(this.spices.length) {
            for(let spice of this.spices) {
                calories += +spice.calories;
            }
        }

        return calories;
    }

    getFullName() {
        let addMore = '';
        if(this.spices.length) {
            for(let spice of this.spices) {
                addMore += ' +'+spice.name;
            }
        }
        return `Гамбургер ${this.type.name} ${this.filling.name} ${addMore}`;
    }
}