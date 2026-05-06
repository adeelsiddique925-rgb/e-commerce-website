function productCard(product) {
    return `
        <article class="product-card">
            <a href="product.html?id=${product.id}" aria-label="View details for ${product.name}">
                <div class="product-art" aria-hidden="true">${product.icon}</div>
            </a>
            <div class="product-info">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
            </div>
            <div class="product-actions">
                <span class="price">${money(product.price)}</span>
                <button type="button" data-add-to-cart="${product.id}">Add</button>
            </div>
            <p class="product-info" data-status="${product.id}" aria-live="polite"></p>
        </article>
    `;
}

function renderProducts() {
    const grid = document.querySelector("#product-grid");
    grid.innerHTML = products.map(productCard).join("");

    grid.querySelectorAll("[data-add-to-cart]").forEach((button) => {
        button.addEventListener("click", () => addToCart(button.dataset.addToCart));
    });
}

document.addEventListener("DOMContentLoaded", renderProducts);
