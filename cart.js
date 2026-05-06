const cartKey = "hearthAndHomeCart";

function getCart() {
    return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId) {
    const cart = getCart();
    const item = cart.find((cartItem) => cartItem.id === productId);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    saveCart(cart);
    showAddedMessage(productId);
}

function removeFromCart(productId) {
    const cart = getCart().filter((cartItem) => cartItem.id !== productId);
    saveCart(cart);
    renderCart();
}

function updateCartCount() {
    const count = getCart().reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll("[data-cart-count]").forEach((element) => {
        element.textContent = count;
    });
}

function money(value) {
    return `$${value.toFixed(2)}`;
}

function showAddedMessage(productId) {
    const status = document.querySelector(`[data-status="${productId}"]`);
    if (!status) {
        return;
    }

    status.textContent = "Added to cart";
    window.setTimeout(() => {
        status.textContent = "";
    }, 1400);
}

document.addEventListener("DOMContentLoaded", updateCartCount);
