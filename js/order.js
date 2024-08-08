document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderform');
    const addToCartButton = document.getElementById('add-to-cart');
    const addToFavoritesButton = document.getElementById('add-to-favorites');
    const applyFavoritesButton = document.getElementById('apply-favorites');
    const orderTableBody = document.querySelector('#order-table tbody');
    const totalPriceElement = document.getElementById('total-price');
    const buyNowButton = document.getElementById('buy-now');

    let cart = [];

    const updateCartTable = () => {
        orderTableBody.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Rs ${item.price.toFixed(2)}</td>
            `;
            orderTableBody.appendChild(row);
            totalPrice += item.price;
        });

        totalPriceElement.textContent = `Rs ${totalPrice.toFixed(2)}`;
    };

    addToCartButton.addEventListener('click', () => {
        const formData = new FormData(orderForm);
        formData.forEach((value, key) => {
            const quantity = parseFloat(value);
            const inputElement = document.getElementById(key);

            if (!inputElement) {
                console.error(`Element with id ${key} not found`);
                return;
            }

            const pricePerUnit = parseFloat(inputElement.getAttribute('data-price'));
            if (quantity > 0) {
                const price = quantity * pricePerUnit;
                cart.push({ name: key, quantity, price });
            }
        });
        updateCartTable();
    });

    addToFavoritesButton.addEventListener('click', () => {
        localStorage.setItem('favoriteOrder', JSON.stringify(cart));
        alert('Order saved as favorite!');
    });

    applyFavoritesButton.addEventListener('click', () => {
        const favoriteOrder = JSON.parse(localStorage.getItem('favoriteOrder'));
        if (favoriteOrder) {
            cart = favoriteOrder;
            updateCartTable();
        } else {
            alert('No favorite order found!');
        }
    });

    buyNowButton.addEventListener('click', () => {
        localStorage.setItem('orderItems', JSON.stringify(cart));
        window.location.href = 'checkout.html';
    });
});
