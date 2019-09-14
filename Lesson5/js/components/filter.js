Vue.component('productFilter', {
    data() {
        return {
            searchString: ""
        }
    },
    methods: {
        filter() {
            let items = [];
            let regexp = new RegExp(this.searchString, 'i');
            for(let item of this.$parent.cacheProducts) {
                if(regexp.test(item.product_name)) {
                    items.push(item);
                }
            }
            this.$parent.products = items;
        },
        emptyUpdate() {
            if(this.searchString.length === 0) {
                this.$parent.products = this.$parent.cacheProducts;
            }
        }
    },
    template: `
        <form class="form-inline mr-auto">
            <input class="form-control mr-sm-2" type="search" placeholder="Что ищем ?" @input="emptyUpdate()" v-model="searchString">
            <button class="btn btn-outline-success my-2 my-sm-0" @click="filter()">Найти</button>
        </form>
    `
});