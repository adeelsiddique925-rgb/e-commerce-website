function selectedProduct() {
    const params = new URLSearchParams(window.location.search);
    const selectedId = params.get("id") || "ceramic-mug";
    return products.find((product) => product.id === selectedId) || products[0];
}

function renderProductDetail() {
    const product = selectedProduct();
    const detail = document.querySelector("#product-detail");
    document.title = `${product.name} | Hearth & Home`;

    detail.innerHTML = `
        <div class="detail-art" aria-hidden="true">${product.icon}</div>
        <div class="detail-copy">
            <p class="price">${money(product.price)}</p>
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <ul class="detail-list">
                ${product.details.map((detailItem) => `<li>${detailItem}</li>`).join("")}
            </ul>
            <div class="button-row">
                <button type="button" data-add-to-cart="${product.id}">Add to cart</button>
                <a class="button secondary" href="products.html">Back to products</a>
            </div>
            <p data-status="${product.id}" aria-live="polite"></p>
        </div>
    `;

    detail.querySelector("[data-add-to-cart]").addEventListener("click", () => addToCart(product.id));
}

document.addEventListener("DOMContentLoaded", renderProductDetail);
