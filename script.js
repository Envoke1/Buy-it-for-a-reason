/* --- script.js --- */

// 1. The Product Database (12 Items)
const products = [
    // SHOES
    { id: 1, name: "Urban Runner", category: "shoes", price: 1200, img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 2, name: "Classic Loafer", category: "shoes", price: 1500, img: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 3, name: "Street High-Top", category: "shoes", price: 1800, img: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 4, name: "Minimal Sneaker", category: "shoes", price: 999, img: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600" },
    
    // BAGS
    { id: 5, name: "Leather Tote", category: "bags", price: 2500, img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 6, name: "Canvas Backpack", category: "bags", price: 800, img: "https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 7, name: "Weekend Duffel", category: "bags", price: 1900, img: "https://images.pexels.com/photos/1058959/pexels-photo-1058959.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 8, name: "Crossbody Clutch", category: "bags", price: 1200, img: "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=600" },

    // WATCHES
    { id: 9, name: "Chronograph Gold", category: "watches", price: 3500, img: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 10, name: "Silver Minimalist", category: "watches", price: 2200, img: "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 11, name: "Sport Digital", category: "watches", price: 900, img: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 12, name: "Classic Leather", category: "watches", price: 1800, img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600" }
];

// 2. Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Route logic based on page
    if (document.getElementById('product-grid')) loadShop('all');
    if (document.getElementById('product-detail')) loadProductDetail();
    if (document.getElementById('cart-items')) loadCart();
});

// 3. Shop Page Functions
function loadShop(filter) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; // Clear current

    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card animate';
        card.onclick = () => window.location.href = `product.html?id=${p.id}`;
        card.innerHTML = `
            <div class="img-wrap"><img src="${p.img}" alt="${p.name}"></div>
            <div class="p-info">
                <h4>${p.name}</h4>
                <p>${p.category.toUpperCase()}</p>
                <span class="price">R ${p.price}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterProducts(category) {
    // Update active button style
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    loadShop(category);
}

// 4. Product Detail Functions
function loadProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = products.find(p => p.id === id);

    if (product) {
        document.getElementById('pdp-img').src = product.img;
        document.getElementById('pdp-name').innerText = product.name;
        document.getElementById('pdp-price').innerText = `R ${product.price}`;
        document.getElementById('pdp-desc').innerText = `This ${product.name} is designed for durability and style. A perfect addition to your ${product.category} collection.`;
        
        document.getElementById('add-btn').onclick = () => addToCart(product);
    }
}

// 5. Cart Logic (Uses LocalStorage)
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Added to cart!');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = document.getElementById('cart-count');
    if(count) count.innerText = cart.length;
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    
    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p>Your bag is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            container.innerHTML += `
                <div class="cart-item animate">
                    <img src="${item.img}">
                    <div>
                        <h4>${item.name}</h4>
                        <p>R ${item.price}</p>
                        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                    </div>
                </div>
            `;
        });
    }
    totalEl.innerText = `R ${total}`;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item at index
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Refresh list
    updateCartCount();
}
