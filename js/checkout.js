document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for your purchase! Your order will be delivered on ' + new Date(new Date().getTime() + 7*24*60*60*1000).toLocaleDateString() + '.');
});

document.addEventListener('DOMContentLoaded', function() {
    const orderItems = JSON.parse(localStorage.getItem('orderItems'));

    if (orderItems) {
        const tbody = document.querySelector('#order-summary-table tbody');
        let totalPrice = 0;

        orderItems.forEach(item => {
            const row = document.createElement('tr');

            const itemNameCell = document.createElement('td');
            itemNameCell.textContent = item.name;
            row.appendChild(itemNameCell);

            const quantityCell = document.createElement('td');
            quantityCell.textContent = item.quantity;
            row.appendChild(quantityCell);

            const priceCell = document.createElement('td');
            priceCell.textContent = `Rs${item.price.toFixed(2)}`;
            row.appendChild(priceCell);

            totalPrice += item.price * item.quantity;

            tbody.appendChild(row);
        });

        document.getElementById('summary-total-price').textContent = `$${totalPrice.toFixed(2)}`;
    }
});
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postal-code').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    // Perform validation (basic example)
    if (name && email && phone && address && city && postalCode && cardNumber && expiryDate && cvv) {
        // Process payment (placeholder)
        alert('Payment successful! Your order has been placed.');

        // Clear the order data
        localStorage.removeItem('orderItems');

        // Redirect to a confirmation page or clear the form
        window.location.href = 'confirmation.html'; // You can create a confirmation page
    } else {
        alert('Please fill in all required fields.');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const orderSummaryTableBody = document.querySelector('#order-summary tbody');
    const totalPriceElement = document.getElementById('total-price');

    let orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];

    let totalPrice = 0;

    orderItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>Rs ${item.price.toFixed(2)}</td>
        `;
        orderSummaryTableBody.appendChild(row);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = `Rs ${totalPrice.toFixed(2)}`;
});
