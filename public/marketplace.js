async function fetchMarketOrders() {
  try {
    const response = await fetch('/orders/market-orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      }
    });

    console.log(response);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    displayOrders(data.buyOrders, data.sellOrders);
  } catch (error) {
    console.error(error);
  }
}

function displayOrders(buyOrders, sellOrders) {
  const buyOrdersDiv = document.getElementById('buy-orders');
  const sellOrdersDiv = document.getElementById('sell-orders');

  buyOrdersDiv.innerHTML = '';
  buyOrders.forEach(order => { // Use buyOrders instead of sellOrders
    const orderDiv = document.createElement('div');
    orderDiv.className = 'border border-green-200 p-2 rounded mb-2';
    orderDiv.innerText = `Price: ${order.price}, Quantity: ${order.quantity}`;
    buyOrdersDiv.appendChild(orderDiv);
  });

  sellOrdersDiv.innerHTML = '';
  sellOrders.forEach(order => {
    const orderDiv = document.createElement('div');
    orderDiv.className = 'border border-green-200 p-2 rounded mb-2';
    orderDiv.innerText = `Price: ${order.price}, Quantity: ${order.quantity}`;
    sellOrdersDiv.appendChild(orderDiv);
  });
}

fetchMarketOrders();
