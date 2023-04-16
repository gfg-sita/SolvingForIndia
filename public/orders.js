document.querySelector('form').addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const order_type = document.getElementById('buy_or_sell').value;
    const product_name = document.getElementById('product_name').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    console.log(order_type, product_name, quantity, price)
    if (order_type == 'buy') {
        try {
            const response = await fetch("/orders/buy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                },
                body: JSON.stringify({
                     product_name, quantity, price
                }),
            });
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                localStorage.setItem("jwtToken", data.token);
                // Redirect to the desired page, e.g., the dashboard or main app page
                window.location.href = "./marketplace.html";
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    else if(order_type=='sell'){
        try {
            const response = await fetch("/orders/sell", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            body: JSON.stringify({  product_name,quantity,price
             }),
          });
    
          const data = await response.json();
          console.log(data);
    
          if (response.ok) {
            localStorage.setItem("jwtToken", data.token);
            alert("Order placed successfully!");
            // Redirect to the desired page, e.g., the dashboard or main app page
            window.location.href = "./marketplace.html";
          } else {
            alert(`Error: ${data.message}`);
          }
        } catch (error) {
          console.error("Error:", error);
        }
    }
});