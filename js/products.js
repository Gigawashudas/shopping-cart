
const products = [
    { id: 1, name: "Lily Blossom", description: "Beautiful fresh lily blossoms.", price: 20, img: "./assets/sample-flower-image.png" },
    { id: 2, name: "Rose Bouquet", description: "Classic red roses arranged beautifully.", price: 25, img: "./assets/sample-flower-image.png" },
    { id: 3, name: "Sunflower Delight", description: "Bright sunflowers for a sunny day.", price: 15, img: "./assets/sample-flower-image.png" },
    { id: 4, name: "Orchid Elegance", description: "Exotic orchids to impress.", price: 30, img: "./assets/sample-flower-image.png" },
    { id: 5, name: "Tulip Garden", description: "Colorful tulips in bloom.", price: 18, img: "./assets/sample-flower-image.png" },
    { id: 6, name: "Daisy Charm", description: "Cheerful daisies for your space.", price: 12, img: "./assets/sample-flower-image.png" },
    { id: 7, name: "Peony Bliss", description: "Soft peonies for any occasion.", price: 28, img: "./assets/sample-flower-image.png" },
    { id: 8, name: "Lavender Love", description: "Fragrant lavender bouquet.", price: 22, img: "./assets/sample-flower-image.png" },
    { id: 9, name: "Carnation Joy", description: "Vibrant carnations for celebrations.", price: 16, img: "./assets/sample-flower-image.png" },
    { id: 10, name: "Gardenia Grace", description: "Elegant gardenias for your home.", price: 35, img: "./assets/sample-flower-image.png" },
    { id: 11, name: "Hydrangea Harmony", description: "Beautiful hydrangeas in bloom.", price: 26, img: "./assets/sample-flower-image.png" },
    { id: 12, name: "Jasmine Jewel", description: "Sweet-smelling jasmine flowers.", price: 14, img: "./assets/sample-flower-image.png" },
    { id: 13, name: "Azalea Aura", description: "Colorful azaleas for decoration.", price: 19, img: "./assets/sample-flower-image.png" },
    { id: 14, name: "Camellia Charm", description: "Graceful camellia bouquet.", price: 24, img: "./assets/sample-flower-image.png" },
    { id: 15, name: "Begonia Beauty", description: "Lovely begonias for indoors.", price: 17, img: "./assets/sample-flower-image.png" },
    { id: 16, name: "Freesia Fresh", description: "Delicate freesias for gifting.", price: 21, img: "./assets/sample-flower-image.png" },
];

const productContainer = document.getElementById("productContainer");
const cartContainer = document.getElementById("cartContainer");
const cartSummary = document.getElementById("cartSummary");
const cartTotalEl = document.querySelectorAll(".cartTotal");
const cartCountEl = document.getElementById("cartCount");
const closeBtn = document.getElementById("close-button")

let cart = [];

function renderProducts(products) {
    productContainer.innerHTML = "";
    products.forEach((product) => {
        const card = document.createElement("article");
        card.className = "product-card bg-white rounded-lg shadow-md flex flex-col p-5 w-[250px]";
        card.innerHTML = `
        <img src="${product.img}" alt="${product.name}" class="w-48 h-48 object-cover rounded-md mb-4" />
        <div class="description flex flex-col items-center">
            <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
            <p class="text-gray-500 text-center h-15 mb-4">${product.description}</p>
            <p class="font-bold text-lg mb-4">${product.price} USD</p>
            <button class="add-to-cart bg-[#e95a08] text-white cursor-pointer font-semibold py-2 px-6 w-[200px] rounded hover:bg-[#ff7300]">Add to Cart</button>
        </div>
      `;
        productContainer.appendChild(card);

        card.querySelector(".add-to-cart").addEventListener("click", () => addToCart(product));
    });
}

function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function renderCart() {
    cartContainer.innerHTML = "";
    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="text-gray-500">Your cart is empty</p>`;
        cartSummary.classList.add("hidden");
        return;
    }

    let total = 0;
    cart.forEach((item) => {
        total += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.className = "flex items-center gap-4 bg-gray-100 p-3 rounded";
        cartItem.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="w-12 h-12 object-cover rounded" />
        <div class="flex-1">
          <h4 class="font-semibold">${item.name}</h4>
          <p>${item.quantity} × ${item.price}</p>
        </div>
      `;
        cartContainer.appendChild(cartItem);
    });


    cartTotalEl.forEach(el => {
        el.textContent = total.toFixed(2);
    })

    cartSummary.classList.remove("hidden");
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
}

// Toggle cart
const cartIcon = document.querySelector(".cart-icon");
const cartSection = document.getElementById("cartContainerSection");
cartIcon.addEventListener("click", () => {
    cartSection.classList.toggle("hidden");
});

closeBtn.addEventListener("click", () => {
    cartSection.classList.toggle("hidden");
});

// Clear cart
document.getElementById("clearCart").addEventListener("click", () => {
    cart = [];
    renderCart();
    cartTotalEl.textContent = "0";
});

// Initial render
renderProducts(products);



const gridBtn = document.getElementById("gridViewBtn");
const listBtn = document.getElementById("listViewBtn");
const card = document.getElementsByClassName("product-card");

gridBtn.addEventListener("click", () => {
    productContainer.classList.remove("flex", "flex-col");
    productContainer.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-4", "gap-8");

    document.querySelectorAll(".product-card").forEach((card) => {
        card.classList.add("flex-col", "w-[250px]");
        card.classList.remove("flex-row", "w-[700px]", "justify-between");
        card.querySelector(".description").classList.remove("w-[500px]");
    });

    gridBtn.classList.add("bg-[#e95a08]", "text-white");
    gridBtn.classList.remove("bg-gray-200", "text-black");

    listBtn.classList.add("bg-gray-200", "text-black");
    listBtn.classList.remove("bg-[#e95a08]", "text-white");
});

listBtn.addEventListener("click", () => {
    productContainer.classList.remove("grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-4", "gap-8");
    productContainer.classList.add("flex", "flex-col", "justify-center", "gap-4");

    document.querySelectorAll(".product-card").forEach((card) => {
        card.classList.remove("flex-col", "w-[250px]");
        card.classList.add("flex-row", "w-[700px]", "justify-between");
        card.querySelector(".description").classList.add("w-[500px]");
    });

    listBtn.classList.add("bg-[#e95a08]", "text-white");
    listBtn.classList.remove("bg-gray-200", "text-black");

    gridBtn.classList.add("bg-gray-200", "text-black");
    gridBtn.classList.remove("bg-[#e95a08]", "text-white");
});


let promoApplied = false;

const promoInput = document.getElementById("promoInput");
const applyPromoBtn = document.getElementById("applyPromo");
const promoMessage = document.getElementById("promoMessage");
const cartTotalCartEl = document.getElementById("cartTotalCart"); // Total in summary

applyPromoBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    promoMessage.textContent = "Your cart is empty!";
    return;
  }

  const code = promoInput.value.trim().toLowerCase();

  if (promoApplied) {
    promoMessage.textContent = "Promo code has already been applied.";
    return;
  }

  let discount = 0;

  if (code === "ostad10") {
    discount = 0.1;
  } else if (code === "ostad50") {
    discount = 0.5;
  } else {
    promoMessage.textContent = "Invalid Promo Code";
    return;
  }

  // Apply discount
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedTotal = total - total * discount;

  cartTotalEl.forEach(el => el.textContent = discountedTotal.toFixed(2));
  cartTotalCartEl.textContent = discountedTotal.toFixed(2);

  promoApplied = true;
  promoMessage.textContent = `Promo applied! You got ${discount * 100}% off.`;
  promoMessage.classList.remove("text-red-500");
  promoMessage.classList.add("text-green-500");
});


