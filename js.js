/*Introduktion, 'About Us' --- 1/2 av startsidan*/
Vue.component('introduction', {
    template: `<div id='introdiv'>
    <img src='images/headerbackground.png' id='introImg'> 

    <h2 id='introHeader'>Welcome to Daniel's <br>Random Assortment of Goods</h2>

    <h3 id='introSubHeader'>Cheaper, Simpler, No Refunds</h3>

    <p id='introText'>Here we sell all kind of items that is second-hand, <br> or gifts and unused items that cannot be refunded.
    <br><br>Cheaper without refund guarantee, but all
    <br>legitimate for purchase.</p>

    </img>
    </div>`
})
/* Top Tre Produkter --- 2/2 av startsidan. Notering: Kan ej ha v-if för specialprodukter eftersom fetchData() är seg vid start*/
Vue.component('specialproducts', {
    template: `<div id='bestSeller'>
    <p id='flufftext'>The Top Three Products as of yet!</p>
    <div id='specialproductContainer'>
    <img class="productsImage" src="/images/chochip.jpg">
    <p class="product-title">Chocolate Chip</p>
    <p class="product-price">15 kr</p>
    <p class="product-description">test</p>
    <p class="product-quantity">I Lager: 1</p>
    </div>
    <div id='specialproductContainer'>
    <img class="productsImage" src="/images/pokemon.jpg">
    <p class="product-title">Pokemon Kort 1999-2000</p>
    <p class="product-price">599 kr</p>
    <p class="product-description">test</p>
    <p class="product-quantity">I Lager: 3</p>
    </div>
    <div id='specialproductContainer'>
    <img class="productsImage" src="/images/ps2.png">
    <p class="product-title">Playstation 2</p>
    <p class="product-price">899 kr</p>
    <p class="product-description">test</p>
    <p class="product-quantity">I Lager: 6</p>
    </div>
    </div>` 
})


/* Produkter -- 1/4 av produktsidan*/
Vue.component('productspage', {
    template: `<div id='bestSeller'>
    <div id='bestFrame'>
    <p>Välj en kategori!</p>
    <a href="#" id="subCookies" @click="$root.subcategory='cookie'"> Kakor </a>
    <a href="#" id="subCollectible" @click="$root.subcategory='collectible'"> Collectibles </a>
    <a href="#" id="subGames" @click="$root.subcategory='games'"> Spel </a>
    </div>
    </div>` 
})

/*Kakor Kategori -- 2/4 av produktsidan */
Vue.component('subcookiespage', {
    data: function () {
        return {
            itemFilter: vueInstance.products.filter(item => item.type === 'cookie'),
            cartainer: cartlist,
        }
    },
    created() {
        console.log(this.itemFilter)
    },
    methods: {
        itemPush: function(id){
            vueInstance.shoppingCartAmount++;
            console.log(shoppingCartAmount)
            let itemSpecific = vueInstance.products.find(item => item.id === id);
            this.cartainer.push(itemSpecific);
            totalCost += parseInt(itemSpecific.price);
            itemSpecific.stock--;
        }
    },
    template: `<div id='subCategory'>
    <div id='productContainer' v-for="products in itemFilter">
    <img class="productsImage" v-bind:src=products.image>
    <p class="product-title">{{products.name}}</p>
    <p class="product-price">{{products.price}} kr</p>
    <p class="product-description">{{products.description}}</p>
    <p class="product-quantity">I Lager: {{products.stock}}</p>
    <button class="product-button" v-bind:key="products.id" v-show="products.stock > 0" v-on:click="itemPush(products.id)">Buy</button>
    <br><br>
    </div>
    </div>`
})

/*Samlarföremål Kategori -- 3/4 av produktsidan */
Vue.component('subcollectiblespage', {
    data: function () {
        return {
            itemFilter: vueInstance.products.filter(item => item.type === 'collectible'),
            cartainer: cartlist,
        }
    },
    created() {
        console.log(this.itemFilter)
    },
    methods: {
        itemPush: function(id){
            vueInstance.shoppingCartAmount++;
            let itemSpecific = vueInstance.products.find(item => item.id === id);
            this.cartainer.push(itemSpecific);
            totalCost += parseInt(itemSpecific.price);
            itemSpecific.stock--;
        }
    },
    template: `<div id='subCategory'>
    <div id='productContainer' v-for="products in itemFilter">
    <img class="productsImage" v-bind:src=products.image>
    <p class="product-title">{{products.name}}</p>
    <p class="product-price">{{products.price}} kr</p>
    <p class="product-description">{{products.description}}</p>
    <p class="product-quantity">I Lager: {{products.stock}}</p>
    <button class="product-button" v-bind:key="products.id" v-show="products.stock > 0" v-on:click="itemPush(products.id)">Buy</button>
    <br><br>
    </div>
    </div>`
})

/*Spel Kategori -- 4/4 av produktsidan */
Vue.component('subgamespage', {
    data: function () {
        return {
            itemFilter: vueInstance.products.filter(item => item.type === 'game'),
            cartainer: cartlist,
        }
    },
    created() {
        console.log(this.itemFilter)
    },
    methods: {
        itemPush: function(id){
            vueInstance.shoppingCartAmount++;
            let itemSpecific = vueInstance.products.find(item => item.id === id);
            this.cartainer.push(itemSpecific);
            totalCost += parseInt(itemSpecific.price);
            itemSpecific.stock--;
        }
    },
    template: `<div id='subCategory'>
    <div id='productContainer' v-for="products in itemFilter">
    <img class="productsImage" v-bind:src=products.image>
    <p class="product-title">{{products.name}}</p>
    <p class="product-price">{{products.price}} kr</p>
    <p class="product-description">{{products.description}}</p>
    <p class="product-quantity">I Lager: {{products.stock}}</p>
    <button class="product-button" v-bind:key="products.id" v-show="products.stock > 0" v-on:click="itemPush(products.id)">Buy</button>
    <br><br>
    </div>
    </div>`
})






/* Varukorg sidan */
Vue.component('shoppingcartpage', {
    data: function(){
        return {
            cartainer: cartlist
        }
    },
    methods: {
        removeMet: function(id){
            var targetindex =  this.cartainer.map(item => item.id).indexOf(id);
            let thisSpecificItem = this.cartainer.find(item => item.id === id);
            this.cartainer.splice(targetindex, 1);
            vueInstance.shoppingCartAmount --;
            totalCost -= parseInt(thisSpecificItem.price);
            thisSpecificItem.stock++;
            console.log(totalCost)

        },
        purchaseMet: function(){
            this.cartainer = []
            vueInstance.shoppingCartAmount = 0;
            totalCost = 0;
            alert("Purchase complete!");
        }
    },
    template: `<div id='shopcartpage'>
    <p class="shoppingList">Your Cart!</p>
    <div id='shoppingContainer2'>
    <div id='shoppingContainer' v-for="products in cartainer">
    <img class="shoppingImage" v-bind:src=products.image>
    <p class="shopping-title">{{products.name}}</p>
    <p class="shopping-price">{{products.price}} kr</p>
    <button class="shopping-remove" v-bind:key="products.id" v-on:click="removeMet(products.id)">X</button>
    </div>
    </div>
    <p class="shopping-counter">Total Sum: {{totalCost}}kr</p>

    <div id='purchase-container' v-if="totalCost > 0">

    <p class="purchase-delivery"> Select your delivery method</p>
    <div id='delivery-field'>
    <div>
    <input type="radio" id="gratis" name="option" value="0" checked>
    <label for="gratis">Gratis. Delivered in 7 days, free shipping. ({{totalCost}}kr total, moms incl.)</label>
    </div>
    <div>
    <input type="radio" id="express" name="option" value="100">
    <label for="express">Express. Delivered in 1 day, for +100 kr ({{totalCost+100}}kr total, moms incl.)</label>
    </div>
    </div>

    <p class="purchase-choice">Select Payment Method</p>
    <img class="mastercard" src="/images/MasterCard_Logo.png"/>
    <img class="paypal" src="/images/paypal.png"/>
    <div id='purchase-payment'>
    <input type="radio" id="pmethod1" name="option2">
    <label for="pmethod1">Mastercard</label>
    <input type="radio" id="pmethod2" name="option2">
    <label for="pmethod2">Paypal</label>
    </div>


    <p class="purchase-input">Fill in Billing Information </p>
    <div id='input-field'>
    <div>
    <label for="name">Name:</label>
    <input class='inputsize' type="text" id="name">
    </div>
    <div>
    <label for="address">Address:</label>
    <input class='inputsize' type="text" id="adress">
    </div>
    <div>
    <label for="cardnumber">Card Number:</label>
    <input class='inputsize' type="text" id="cardnumber">
    </div>
    </div>


    <div id='purchase-complete'>
    <button class="shopping-buy" v-on:click="purchaseMet()">Purchase</button>
    </div>
    </div>
    </div>`
})








/*Admin sidan*/
Vue.component('adminpage', {
    template: `<div id='admindiv'>
    <p class="adminOptions">What would you like to do?</p>
    <button class="adminAdd" @click="$root.adminpage='add'">Add</button>
    <button class="adminChange" @click="$root.adminpage='change'">Change</button>
    <button class="adminEt">???</button>
    </div>`
})

Vue.component('adminaddpage', {
    data: function() {
        return {
            productaddid: 9,
            name: '',
            price: 0,
            image: '',
            description: '',
            type: '',
            stock: 0
        }
    },
    methods: {
        addproduct: function(){
            let product = {
                id: '',
                name: '',
                price: 0,
                image: '',
                description: '',
                type: '',
                stock: 0
            }

            product.id = this.productaddid++;
            product.name = this.name;
            product.price = this.price;
            product.image = this.image;
            product.description = this.description;
            product.type = this.type;
            product.stock = this.stock;

            vueInstance.products.push(product);
            alert("Product Added!");
        }
    },
    template: `<div id='admindiv'>
    <p class="adminOptions">Add New Item</p>
    <label class="adminField" for="addtitle">Title</label>
    <input type="text" id="addtitle" v-model="name">

    <label class="adminField" for="adddescription">Description</label>
    <input type="text" id="adddescription" v-model="description">

    <label class="adminField" for="addimage">Image</label>
    <input type="text" id="addimage" v-model="image">

    <label class="adminField" for="addprice">Price</label>
    <input type="text" id="addprice" v-model="price">

    <label class="adminField" for="addtype">Category (cookie, collectible, or game)</label>
    <input type="text" id="addtype" v-model="type">

    <label class="adminField" for="addstock">Stock</label>
    <input type="text" id="addstock" v-model="stock">

    <button class="adminAddbutton" v-on:click="addproduct()">Add Product</button>
    </div>`
})







/* Footer, Contact Info with Href */
Vue.component('vuefooter', {
    template: `<div id='footer'>
    <a class='footerLinks' href="#">Privacy Policy</a>
    <a class='footerLinks' href="#">Legal</a>
    <a class='footerLinks' href="mailto:DanielsGrejor23@gmail.com">DanielsGrejor23@gmail.com</a>
    <a class='footerLinks'>+4679230450</a>
    <p class='copyright'>Copyright © 2021</p>
    </div>` 
})







//vue instance

var vueInstance = new Vue({
    
    el: '#bodyContainer',

    data: {
        tab: "start",
        subcategory: "nothing",
        adminpage: "nothing",
        products: [],
        shoppingCartAmount: 0,
        revealpage: false,
    },

    methods: {
        fetchData: async function() {
            await axios.get('products.json')
            .then(response => {
                
                this.products = response.data.products,
                console.log(this.products)
            })
        },
        openStart: function()
        {
            this.tab = "start"
        },
        openProduct: function()
        {
            this.tab = "products"
        },
        openCart: function()
        {
           this.tab = "cart"
        },
        openAdmin: function()
        {
           this.tab = "admin"
        }
    },   
    created() {
        this.fetchData();
    }
})

//JS variables that work only outside the vue instance
let cartlist = [];
let totalCost = 0;