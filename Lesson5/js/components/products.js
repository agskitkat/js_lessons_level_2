Vue.component('products', {
    data() {
        return {
            url: 'catalogData.json',
        }
    },
    mounted() {
        this.$parent.getJson(this.url).then((data) => {
            this.$parent.products = this.$parent.cacheProducts = data;
        });
    },
    template: `
    <div>
        <div class="products row pt-3" v-if="$root.products.length > 0">
            <product 
                v-for="item of $root.products" 
                :key="item.id_product" 
                :product="item"
                :img="'https://placehold.it/200x150'"
            />
        </div>
     
        <div class="alert alert-dark m-3" v-if="$root.products.length === 0" role="alert">
           Нет товаров по условиям фильтра.
        </div>
    </div>
    `
});