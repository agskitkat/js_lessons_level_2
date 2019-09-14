new Vue({
    el: '#app',
    data: {
        API: "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/",
        cacheProducts: [], // Вынесено из компонента, как глобальный список товаров.
        products: [], // Выполнены преобразования по сортировке, фильтрации и т.д.
        isError: false
    },
    methods: {
        getJson(url) {
            return fetch(this.API + url)
                .then(result => result.json())
                .catch(error => {
                    this.isError = true;
                    console.log(error);
                });
        }
    },
    template: `
        <div>
            <nav class="navbar navbar-light bg-light">
              <a class="navbar-brand" href="#">BEST MARKET</a>
              <productFilter></productFilter>
              <cart ref="cart"></cart>
            </nav>
            
            <products v-if="!isError"></products>
            <errorMsg v-if="isError"></errorMsg>
        </div>
    `
});