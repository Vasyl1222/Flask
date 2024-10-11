let adIndex = 0;
const ads = document.querySelectorAll('.ad-image');

function showNextAd() {
    ads[adIndex].style.opacity = 0; 
    adIndex = (adIndex + 1) % ads.length; 
    ads[adIndex].style.opacity = 1; 
}

setInterval(showNextAd, 2000); 




let favoriteCount = localStorage.getItem('favoriteCount') ? parseInt(localStorage.getItem('favoriteCount')) : 0; 
let compareCount = localStorage.getItem('compareCount') ? parseInt(localStorage.getItem('compareCount')) : 0; 
let addedProducts = new Set(JSON.parse(localStorage.getItem('addedProducts')) || []); 

function updateCounts() {
    const favoriteCountElement = document.getElementById('favorite-count');
    const compareCountElement = document.getElementById('compare-count');

    favoriteCountElement.style.display = favoriteCount > 0 ? 'block' : 'none'; 
    favoriteCountElement.textContent = favoriteCount;

    compareCountElement.style.display = compareCount > 0 ? 'block' : 'none';
    compareCountElement.textContent = compareCount;

    localStorage.setItem('favoriteCount', favoriteCount);
    localStorage.setItem('compareCount', compareCount);
}

updateCounts();

function toggleFavorite(element) {
    const icon = element.querySelector('img');  
    const currentSrc = icon.getAttribute('src');
    const fullIconSrc = icon.getAttribute('data-full'); 
    const productCard = element.closest('.product-card');
    const productName = productCard.querySelector('.product-name').textContent;
    const productImage = productCard.querySelector('img').src; 
    const productPrice = productCard.querySelector('.product-price').textContent; 

    let favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];

    if (currentSrc === fullIconSrc) {
        icon.setAttribute('src', '/pictures/icon4.png'); 
        favoriteCount--; 

        favoriteProducts = favoriteProducts.filter(product => product.name !== productName);
        showNotification('Видалено з улюбленого');
    } else {
        icon.setAttribute('src', '/pictures/iconfull.png'); 
        favoriteCount++; 

        favoriteProducts.push({ name: productName, image: productImage, price: productPrice });
        showNotification('Додано до улюбленого');
    }

    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
    updateCounts();
}

function addToCompare(element) {
    const icon = element.querySelector('img'); 
    const productName = element.closest('.product-card').querySelector('.product-name').textContent;
    
    if (!addedProducts.has(productName)) {
        addedProducts.add(productName);
        compareCount++; 
        icon.src = "/pictures/icon3Add.png"; 
        showNotification('Додано до порівняння');
    } else {
        addedProducts.delete(productName);
        compareCount--;
        icon.src = "/pictures/icon3.png"; 
        showNotification('Видалено з порівняння');
    }

    localStorage.setItem('addedProducts', JSON.stringify([...addedProducts]));
    updateCounts();
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message; 
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); 
}

function displayFavoriteProducts() {
    const favoriteProductsContainer = document.getElementById('favorite-products');
    favoriteProductsContainer.innerHTML = ''; 

    const favoriteProducts = JSON.parse(localStorage.getItem('addedProducts')) || [];

    favoriteProducts.forEach(productName => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <div class="product-name">${productName}</div>
            <button onclick="removeFromFavorites('${productName}')">Видалити</button>
        `;

        favoriteProductsContainer.appendChild(productCard);
    });
}

function removeFromFavorites(productName) {
    favoriteCount--;
    addedProducts.delete(productName);
    localStorage.setItem('addedProducts', JSON.stringify([...addedProducts]));
    updateCounts();
    displayFavoriteProducts();
}

window.onload = function() {
    displayFavoriteProducts();
    updateCounts();
};






let cartCount = 0; 

function buyProduct(productName, price) {
    cartCount++; 
    updateCartCount(); 
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.innerText = cartCount; 
    cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
    showNotification('Товар додано до кошику'); 
    
    updateCartCountInHeader();
}

function updateCartCountInHeader() {
    const headerCartCount = document.getElementById('header-cart-count');
    headerCartCount.textContent = cartCount > 0 ? cartCount : '';
}

function addToCompare(element) {
    const icon = element.querySelector('img'); 
    const productCard = element.closest('.product-card');
    const productName = productCard.querySelector('.product-name').textContent;
    const productImage = productCard.querySelector('img').src;
    const productFeatures = Array.from(productCard.querySelectorAll('ul li')).map(li => li.textContent);

    let compareList = JSON.parse(localStorage.getItem('compareList')) || {};

    if (!compareList[productName]) {
        compareList[productName] = {
            image: productImage,
            features: productFeatures
        };
        compareCount++;
        icon.src = "/pictures/icon3Add.png"; 
        showNotification('Додано до порівняння');
    } else {
        delete compareList[productName];
        compareCount--;
        icon.src = "/pictures/icon3.png"; 
        showNotification('Видалено з порівняння');
    }

    localStorage.setItem('compareList', JSON.stringify(compareList));
    updateCounts();
}


function toggleCatalog() {
    var popup = document.getElementById("catalogPopup");
    popup.style.display = (popup.style.display === "block") ? "none" : "block";
}

function closeCatalog(event) {
    var popup = document.getElementById("catalogPopup");
    popup.style.display = "none"; 
}

function showProducts(category) {
    var productList = document.getElementById("productList");
    var products = '';

    if (category === 'laptops') {
        products = `
            <h3>Ноутбуки та комп'ютери</h3>
            <div class="laptop-list">
               <div class="laptop-column">
                  <li><a href="http://127.0.0.1:5000/laptops">Ноутбуки</a></li>
               </div>
               <div class="laptop-column">
                  <li><a href="link_to_laptop11">ПК</a></li>
               </div>
            </div>
        `;
    }      

    productList.innerHTML = products; 
}

