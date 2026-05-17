// LOGIN SYSTEM

const loginForm = document.getElementById("login-form");
const loginScreen = document.getElementById("login-screen");
const mainSite = document.getElementById("main-site");

let isAdmin = false;

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(email === "admin@mail.com" && password === "12345"){

        isAdmin = true;

        loginScreen.style.display = "none";
        mainSite.style.display = "block";

        renderProducts();

    }

    else{

        loginScreen.style.display = "none";
        mainSite.style.display = "block";

    }

});

// CART

let cart = 0;

function addToCart(){

    cart++;

    document.getElementById("cart-count").innerText = cart;

}

// PRODUCTS ARRAY

let products = [

    {
        id: 1,
        category: "MAKEUP",
        name: "Gloss Lip Shine",
        desc: "Gives lips a natural glossy finish.",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?q=80&w=1200&auto=format&fit=crop"
    },

    {
        id: 2,
        category: "HAIR CARE",
        name: "Hair Care Oil",
        desc: "Deep nourishing oil for silky hair.",
        price: 18.50,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop"
    },

    {
        id: 3,
        category: "BODY CARE",
        name: "Body Shimmer Gel",
        desc: "Soft glowing shimmer for smooth skin.",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200&auto=format&fit=crop"
    }

];

// RENDER PRODUCTS

function renderProducts(){

    const grid = document.querySelector(".products-grid");

    grid.innerHTML = "";

    products.forEach((product, index) => {

        let adminButtons = "";

        if(isAdmin){

            adminButtons = `

            <div class="admin-buttons">

                <button onclick="editProduct(${index})">
                    Edit
                </button>

                <button onclick="deleteProduct(${index})">
                    Delete
                </button>

            </div>

            `;

        }

        grid.innerHTML += `

        <div class="product-card">

            <img src="${product.image}">

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p>${product.desc}</p>

                <div class="product-bottom">

                    <span class="price">
                        $${product.price}
                    </span>

                    <button onclick="addToCart()">
                        Add to Cart
                    </button>

                </div>

                ${adminButtons}

            </div>

        </div>

        `;

    });

}

// INITIAL PRODUCTS

renderProducts();

// DELETE

function deleteProduct(index){

    products.splice(index, 1);

    renderProducts();

}

// EDIT

function editProduct(index){

    const newName = prompt("Update product name:");
    const newDesc = prompt("Update description:");
    const newPrice = prompt("Update price:");

    if(newName && newDesc && newPrice){

        products[index].name = newName;
        products[index].desc = newDesc;
        products[index].price = newPrice;

        renderProducts();

    }

}

// CREATE PRODUCT

const productsSection = document.getElementById("products");

const adminPanel = document.createElement("div");

adminPanel.classList.add("admin-panel");

adminPanel.innerHTML = `

<h2>Add New Product</h2>

<input type="text" id="new-name" placeholder="Product Name">

<input type="text" id="new-desc" placeholder="Description">

<input type="number" id="new-price" placeholder="Price">

<input type="text" id="new-image" placeholder="Image URL">

<button onclick="addProduct()">
Add Product
</button>

`;

productsSection.prepend(adminPanel);

// SHOW ONLY FOR ADMIN

adminPanel.style.display = "none";

// ADMIN LOGIN SHOW PANEL

loginForm.addEventListener("submit", function(){

    if(isAdmin){

        adminPanel.style.display = "flex";

    }

});

// ADD PRODUCT

function addProduct(){

    const name = document.getElementById("new-name").value;
    const desc = document.getElementById("new-desc").value;
    const price = document.getElementById("new-price").value;
    const image = document.getElementById("new-image").value;

    if(name && desc && price && image){

        products.push({

            id: Date.now(),
            category: "NEW",
            name,
            desc,
            price,
            image

        });

        renderProducts();

        document.getElementById("new-name").value = "";
        document.getElementById("new-desc").value = "";
        document.getElementById("new-price").value = "";
        document.getElementById("new-image").value = "";

    }

}
