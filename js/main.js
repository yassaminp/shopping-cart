
// making shop items start

const shop_element = document.getElementById('shop');


let basket = JSON.parse(localStorage.getItem("data")) || [];



shop_element.innerHTML = shopItemData.map((e)=>{

    let {id,Name,desc,img,price} = e;

    let search = basket.find((x) => x.id.toString() === id ) || [];
    

    return `

    <div class="cart">
                <img src="${img}" alt="" class="cart-img">
                <div class="cart-details">
                    <h2 class="cart-details-heading">${Name}</h2>
                    <p class="cart-details-paragraph">${desc}</p>
                    <div class="cart-details-amount">
                        <div class="cart-details-amount-price">$ ${price}</div>
                        <div class="cart-details-amount-box">
                            <i class="fa-solid fa-minus decrease-icon" onclick="decreament(${id})" ></i>
                            <div class="selected-amount" id="${id}">
                            ${search.item === undefined? 0 : search.item }
                            </div>
                            <i class="fa-solid fa-plus increase-icon" onclick="increament(${id})"></i>
                        </div>
                    </div>
                </div>
            </div>

    `
}).join("");

// making shop items end

// increament and decreament btn start 

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

    localStorage.setItem("data" , JSON.stringify(basket));

    update(selectedId);
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
    
    localStorage.setItem("data" , JSON.stringify(basket));
}

// increament and decreament btn end

// basket amount 

function update(id){
    
    let search = basket.find((x) => x.id === id).item;
    document.getElementById(id).innerHTML = search ;
    

    calculate(id);
}

function calculate(id){
    let basket_element = document.querySelector('.navbar-cart-amount');
    
    let basket_amount = basket.map((x) => x.item).reduce((total , current)=>{
        return total + current ;
    } , 0);

    basket_element.innerHTML  = basket_amount ;

}
calculate();
// basket amount end