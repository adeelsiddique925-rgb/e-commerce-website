function cartLine(item) {
    const product = products.find((storeProduct) => storeProduct.id === item.id);
    if (!product) {
        return "";
    }

    return `
        <article class="cart-item">
            <div class="cart-icon" aria-hidden="true">${product.icon}</div>
            <div>
                <h2>${product.name}</h2>
                <p>${item.quantity} × ${money(product.price)}</p>
            </div>
            <button class="remove-button" type="button" data-remove-from-cart="${product.id}">Remove</button>
        </article>
    `;
}

function renderCart() {
    const cart = getCart();
    const cartItems = document.querySelector("#cart-items");
    const totalElement = document.querySelector("#cart-total");

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty-message">Your cart is empty.</p>`;
        totalElement.textContent = money(0);
        return;
    }

    cartItems.innerHTML = cart.map(cartLine).join("");

    const total = cart.reduce((sum, item) => {
        const product = products.find((storeProduct) => storeProduct.id === item.id);
        return product ? sum + product.price * item.quantity : sum;
    }, 0);

    totalElement.textContent = money(total);

    cartItems.querySelectorAll("[data-remove-from-cart]").forEach((button) => {
        button.addEventListener("click", () => removeFromCart(button.dataset.removeFromCart));
    });
}

document.addEventListener("DOMContentLoaded", renderCart);
