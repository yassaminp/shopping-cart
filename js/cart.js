const carts_heading = document.querySelector('.carts-heading');
const carts = document.querySelector('.carts');


let basket = JSON.parse(localStorage.getItem("data")) || [];

function calculate(){
    let basket_element = document.querySelector('.navbar-cart-amount');
    
    let basket_amount = basket.map((x) => x.item).reduce((total , current)=>{
        return total + current ;
    } , 0);

    basket_element.innerHTML  = basket_amount ;

}

calculate();

function generateShopItem(){

    if(basket.length !== 0){
        return carts.innerHTML =  basket.map((x) => {
    
        let {item , id} = x ;
        let search = shopItemData.find((y) => y.id === id.toString()) || [];
        return `
            <div class="carts-item">
                <img  src="${search.img}" alt="" class="carts-item-img">
                <div class="carts-item-details">
                    <div class="details-name-price-x">
                        <div class="name-price">
                            <h2 class="name">${search.Name}</h2>
                            <p class="price">$ ${search.price}</p>
                        </div>
                        <i class="fa-solid fa-x cross-icon" onclick="removeItem(${id})"></i>
                    </div>
                    <div class="cart-details-amount-box">
                        <i class="fa-solid fa-minus decrease-icon" onclick="decreament(${id})"></i>
                        <div class="selected-amount" id="${id}" >${item}</div>
                        <i class="fa-solid fa-plus increase-icon" onclick="increament(${id})"></i>
                    </div>
                    <h1 class="item-total-price">Total:$ ${item * search.price}</h1>
                </div>
            </div>
        `
    }).join("");
    }
    else{
        carts.innerHTML = ``;

        carts_heading.innerHTML = `
        <h2 class="carts-heading-title">Your Cart is empty</h2>
        <a href="index.html" >
          <button type="button" class="carts-heading-btn back-btn" >Back to home</button>
        </a>
        `;
    }
}

generateShopItem();

function increament(id){
    let selectedId = id;
    
    let search = basket.find((x) => x.id === selectedId);

    if(search === undefined){
        basket.push({
            id:selectedId,
            item : 1 ,
        });
    }else{
        search.item += 1 ;
    }

    update(selectedId);
    generateShopItem();
    localStorage.setItem("data" , JSON.stringify(basket));
}

function decreament(id){
    let selectedId = id;
    
    let search = basket.find((x) => x.id === selectedId);

    if(search === undefined){
        return ;   
    } else if(search.item === 0){
        return ;
    }else{
        search.item -= 1 ;
    }
    
    update(selectedId);

    basket = basket.filter((x) => x.item !== 0);
    generateShopItem();
    localStorage.setItem("data" , JSON.stringify(basket));
}

function update(id){
    
    let search = basket.find((x) => x.id === id);

    document.getElementById(id).innerHTML = search.item ;

    calculate(id);
    totalAmount();
}

function removeItem(id){
    let selectedId = id;
    
    basket = basket.filter((x) => x.id !== id);
    generateShopItem();
    calculate(id);
    totalAmount();
    localStorage.setItem("data" , JSON.stringify(basket));
}

function totalAmount(){
    let pricesArr = [];
    let finalPrice ;
    
    if( basket.length !== 0){
        basket.map((x) =>{
            let search = shopItemData.find((e) => e.id === x.id.toString()) ;
            let num = search.price * x.item ;
            pricesArr.push(num);
        })
            let total = pricesArr.reduce((total , current) =>{
            finalPrice = total + current ;
                return finalPrice;
        } , 0 );

    }else return ;
    
    carts_heading.innerHTML = `
    <div class="carts-heading">
    <h1 class="carts-heading-title">Total Bill : $ ${finalPrice} </h1>
    <button class="carts-heading-btn checkout-btn">Checkout</button>
    <button class="carts-heading-btn clear-btn" onclick="clearCart()">Clear cart</button>
    </div>
    `
    
    
}
totalAmount();

function clearCart(){
    basket =[];
    generateShopItem();
    calculate();
    localStorage.setItem("data" , JSON.stringify(basket));
}