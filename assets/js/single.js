const singleContainer = document.querySelector('.single');
const locationParams = new URLSearchParams(location.search);

function createSingleItem() {
    let productId = locationParams.get('id');

    fetch('https://fakestoreapi.com/products/' + productId)
        .then(res=>res.json())
        .then(json=>
            singleContainer.insertAdjacentHTML('beforeend', `<div class="box"><img src="${json.image}" alt="product image"/></div><div class="box"><div class="row"><div class="title">${json.title}</div><div class="category">${json.category}</div></div><div class="row"><div class="price">${json.price}</div></div><div class="row"><div class="count"><span class="number">${json.rating.count}</span> items available</div><div class="rate"><span class="number">${json.rating.rate} / 5</span></div></div><div class="row"><div class="description">${json.description}</div></div><div class="row"><button class="add-to-card-btn">buy</button></div></div>`)
        )
}

window.addEventListener('load', createSingleItem);


