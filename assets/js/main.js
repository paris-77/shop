const popular = document.querySelector('#popular');
const carouselButtons = document.querySelectorAll('.carousel-btn');

carouselButtons.forEach( button => {
    button.addEventListener('click', slideCarousel);
});

function slideCarousel(event) {

    let carouselElem = event.target.parentElement.children[1];
    let productWidth = carouselElem.children[0].children[0].offsetWidth;

    if (event.target.classList.contains('slide-left')) {
        carouselElem.scrollLeft -= productWidth;

    } else if (event.target.classList.contains('slide-right')) {
        carouselElem.scrollLeft += productWidth;
    }
}

// get All products in all categories
function getAllProducts() {
    
    fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>
            json.forEach( product => {
                createProduct(product.id, product.title,product.price,product.image)
            }));
}

// get products by specific category
function showProductByCategory(category) {

    fetch('https://fakestoreapi.com/products/category/' + category)
        .then(res=>res.json())
        .then(json=>
            json.forEach( product => {
                createProduct(product.title,product.price,product.image)
            }));
}

// create product
function createProduct(id, title, price, image) {

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

window.addEventListener('load', getAllProducts)

// filter products by price
function filterByPrice() {
    productsWrapper.innerHTML = '';

    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>
                json.forEach(item => {
                    if (+item.price >= +priceRange.value) {
                        createProduct(item.title,item.price,item.image)
                    }
                })
                )
}

priceRange.addEventListener('change', filterByPrice);


