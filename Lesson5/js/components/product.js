Vue.component('product', {
    props: ['product', 'img'],
    template: `
        <div class="col-md-3">
            <div class="card">
                <img :src="img" class="card-img-top" :alt="product.product_name">
                <div class="card-body">
                    <h5 class="card-title">{{ product.product_name }}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p class="card-text"><b>{{ product.price }} руб.</b></p>
                    <a href="#addToCart" class="btn btn-success" @click="$root.$refs.cart.add(product)">В корзину</a>
                </div>
            </div>
        </div>
    `
});