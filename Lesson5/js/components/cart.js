Vue.component('cart', {
    data() {
        return {
            url: 'getBasket.json',
            isCartView: false,
            cartProducts: [],
        }
    },
    methods: {
        add(item) {
            this.$parent.getJson('addToBasket.json')
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartProducts.find(el => el.id_product === item.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, item);
                            this.cartProducts.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item, force = false) {
            this.$parent.getJson('deleteFromBasket.json')
                .then(data => {
                    if(item.quantity>1 && !force){
                        item.quantity--;
                    } else {
                        this.cartProducts.splice(this.cartProducts.indexOf(item), 1)
                    }
                })
        },
        calcSum() {
            let sum = 0;
            for(let item of this.cartProducts) {
                sum = sum + item.quantity * item.price;
            }
            return sum;
        }
    },
    mounted() {
        this.$parent.getJson(this.url)
            .then(data => {
                this.cartProducts = data.contents;
            });
    },
    template:
        `
            <div>
                <a class="navbar-brand" href="#viewOrHideCart" @click="isCartView = !isCartView">
                    Корзина <span class="badge badge-success">{{cartProducts.length}}</span>
                </a>
                <div class="cart" v-if="isCartView && cartProducts.length > 0">
                    <cartitem v-for="ci of cartProducts" 
                    :key="ci.product_id" 
                    :item="ci" 
                    @remove="remove"
                    :img="'https://placehold.it/92x92'"></cartitem>
                    <div class="p-3">Итого: {{ calcSum() }}</div>
                </div>
            </div>
        `
});