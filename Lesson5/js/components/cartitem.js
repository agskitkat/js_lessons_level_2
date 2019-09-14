Vue.component('cartitem', {
    props: ['item', 'img'],
    template: `
        <div class="media">
          <img :src="img" class="mr-3" :alt="item.product_name">
          <div class="media-body">
            <p class="mt-2 mb-2"><b>{{  item.product_name }} {{ item.price * item.quantity }} руб.</b></p>
            <div class="row pr-3 pl-3">
                 <div class=" input-group-itemCart col-">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon1" @click="$root.$refs.cart.remove(item)">-</button>
                      </div>
                      <input type="text" class="form-control" placeholder="" :value="item.quantity">
                      <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon1"  @click="$root.$refs.cart.add(item)">+</button>
                      </div>
                    </div>
                 </div>
                 <div class="col-auto">
                    <a href="#removeItemFromCart"  @click="$root.$refs.cart.remove(item, true)">Удалить</a>
                 </div>
            </div>
            
          </div>
        </div>
    `
});