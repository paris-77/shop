// product images
const filtersBtn = document.querySelector('.filters-btn');
const aside = document.querySelector('.aside');

// In mobile size, the aside tag is toggled by the button
function showAside() {
    if (aside.classList.contains('active')) {
        aside.classList.remove('active');
        filtersBtn.classList.add('active');
    } else {
        aside.classList.add('active');
        filtersBtn.classList.remove('active');
    }
}
filtersBtn.addEventListener('click', showAside)


const productsWrapper = document.querySelector('.products-wrapper');
const categoryItems = document.querySelectorAll('[data-category]');
const priceRange = document.querySelector('#priceRange');

// active category 
function activeCategoryFilter(event) {
    productsWrapper.innerHTML = '';

    if (event.target.classList.contains('active')) {     
        event.target.classList.remove('active');
        getAllProducts();

    } else {
        categoryItems.forEach( filterItem => {
            filterItem.classList.remove('active')
        });
        event.target.classList.add('active');
        showProductByCategory(event.target.dataset.category)

    }
}

// get All products in all categories
function getAllProducts() {
    
    fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>
            json.forEach( product => {
                // console.log(product.id);
                createProduct(product.title,product.price,product.image, product.id)
            }));
}

// get products by specific category
function showProductByCategory(category) {

    fetch('https://fakestoreapi.com/products/category/' + category)
        .then(res=>res.json())
        .then(json=>
            json.forEach( product => {
                createProduct(product.title,product.price,product.image, product.id)
            }));
}

// create product
function createProduct(title, price, image, id) {

    let productDiv = document.createElement('div');
    productDiv.setAttribute('class','product');
    let productImg = document.createElement('img');
    productImg.setAttribute('src', image);

    productImg.setAttribute('alt','product image');
    let productName = document.createElement('div');
    productName.setAttribute('class','name');
    productName.innerHTML = title;

    let productPrice = document.createElement('div');
    productPrice.setAttribute('class','price');
    productPrice.innerHTML = price;

    let productBtn = document.createElement('a');
    productBtn.setAttribute('class','add-to-card-btn');
    productBtn.setAttribute('href','single.html?id=' + id);
    productBtn.innerHTML = 'buy';

    productDiv.append(productImg, productName, productPrice, productBtn);

    productsWrapper.append(productDiv);
}

// active filters by click
categoryItems.forEach( filterItem => {
    filterItem.addEventListener('click',activeCategoryFilter);
});

window.addEventListener('load', getAllProducts)


// filter products by price
function filterByPrice() {
    productsWrapper.innerHTML = '';

    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>
                json.forEach(item => {
                    if (+item.price >= +priceRange.value) {
                        createProduct(item.title, item.price, item.image, item.id)
                    }
                })
                )
}
priceRange.addEventListener('change', filterByPrice);

