class Product {
title = 'Default';
imageUrl;
desc;
price;

constructor(title,image,desc,price){
this.title = title;
this.image = image;
this.desc = desc;
this.price = price;
}
};

class ElementAttribute {
constructor(attrName, attrValue){
this.name = attrName;
this.value = attrValue;
}

}

class Component {
    constructor(renderHookId, shouldRender = true){
        this.hookId = renderHookId;
        if(shouldRender){
            this.render()
        }
    }

    render(){};

    createRootElement(tag,cssClasses,attributes){
        const rootElement = document.createElement(tag);
        if(cssClasses){
            rootElement.className = cssClasses;  
        }
        if(attributes && attributes.length > 0){
            for(const attr of attributes){
                rootElement.setAttribute(attr.name, attr.value);
            }

        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }
}

class ShoppingCart extends Component{
    items = [];

    get totalAmount(){
        const sum = this.items.reduce((prevVal, currItem)=>{
                return prevVal + currItem.price;
        }, 0);
        return sum;
    };

    set cartItems(value){
        this.items = value;
        this.totalOutPut.innerHTML = `
        <h2>Total:$${this.totalAmount.toFixed(2)}</h2>
        `;
    }
        constructor(renderHookId){
            super(renderHookId);

        }

    addProduct(product){
       const updatedItems = [...this.items];
       updatedItems.push(product);
       this.cartItems = updatedItems;
        
       
    }

    orderProduct(){
        console.log('ordering..')
        console.log(this.items)
    }

    render(){
       const cartEl =  this.createRootElement('section', 'cart');
        cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now</button>
        `;
        const orderButton = cartEl.querySelector('button');
        orderButton.addEventListener('click',()=> this.orderProduct())
        this.totalOutPut= cartEl.querySelector('h2');
    }
};
 
class ProductItem extends Component {
constructor(product, renderHookId){
    super(renderHookId, false);
this.product = product;
this.render();
}

addToCart(){
App.addProductToCart(this.product)
}

render(){
    const prodEl = this.createRootElement('li', 'product-item')
  
    prodEl.innerHTML = `
    <div>
    <img src="${this.product.image}" alt="${this.product.title}"  />
    <div class="product-item__content">
    <h2>${this.product.title}</h2>
    <h3>$${this.product.price}</h3>
    <p>${this.product.desc}</p>
    <button> Add to Cart</button>
    </div>
    </div>
    `;
const addCartBtn = prodEl.querySelector('button');
addCartBtn.addEventListener('click', this.addToCart.bind(this) )
   
}

};

class ProductList extends Component {
    products = [];
   

    constructor(renderHookId){
        super(renderHookId);
        this.fetchProducts();
        
         
    }

    fetchProducts(){
        this.products = [
            new Product(
                'car',
                'https://media.istockphoto.com/photos/pillow-isolated-on-white-background-picture-id899226398?k=20&m=899226398&s=612x612&w=0&h=zqZPZFOY57m0iV_pE8c1lbyDPdEDhXPYJSDcsh9dFK4=',
                'this is a car',
                50
                ),
            new Product(
                'a pillow',
                'https://media.istockphoto.com/photos/pillow-isolated-on-white-background-picture-id899226398?k=20&m=899226398&s=612x612&w=0&h=zqZPZFOY57m0iV_pE8c1lbyDPdEDhXPYJSDcsh9dFK4=',
                'a soft pillow',
                 19.99
                 ),
            new Product(
                'a carpet',
                'https://cdn3.volusion.com/qqvux.kjhcv/v/vspfiles/photos/S1633-2T.jpg?v-cache=1592833033',
                'a white carpet',
                89.95
                )
         ];
         this.renderProducts()
    };

    renderProducts(){
        for(const prod of this.products){
            new ProductItem(prod, 'prod-list');
         }
    };

    render(){
     this.createRootElement('ul', 'product-list',[new ElementAttribute('id', 'prod-list')]);
       if(this.products && this.products.length > 0){
           this.renderProducts()
       }
      
    }
};

class Shop extends Component  {
    constructor(){
        super();
    }
    render(){  
       
        this.cart = new ShoppingCart('app');
        
         new ProductList('app');
       
       
       
        
    }
};

class App {
    static cart;

  static init(){
      const shop = new Shop();
      this.cart = shop.cart;

    }
    static addProductToCart(product){
        this.cart.addProduct(product)
    }
}

App.init();