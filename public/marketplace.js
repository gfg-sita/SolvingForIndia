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
  buyOrders.forEach(order => {
    const orderDiv = document.createElement('div');
    orderDiv.className = 'border border-green-200 p-2 rounded mb-2';
    orderDiv.innerText = `Price: ${order.price}, Quantity: ${order.quantity}`;
    buyOrdersDiv.appendChild(orderDiv);
  });
  const orderDiv1 = document.createElement('div');
    orderDiv1.className = 'border border-green-200 p-2 rounded mb-2';
    orderDiv1.innerText = `Price: ${110}, Quantity: ${9}`;
    sellOrdersDiv.appendChild(orderDiv1);
    
    const orderDiv2 = document.createElement('div');
    orderDiv2.className = 'border border-green-200 p-2 rounded mb-2';
    orderDiv2.innerText = `Price: ${175}, Quantity: ${200}`;
    sellOrdersDiv.appendChild(orderDiv2);

    const orderDiv3 = document.createElement('div');
    orderDiv3.className = 'border border-green-200 p-2 rounded mb-2';
    orderDiv3.innerText = `Price: ${200}, Quantity: ${500}`;
    sellOrdersDiv.appendChild(orderDiv3);

 /* sellOrdersDiv.innerHTML = '';
  sellOrders.forEach(order => {
    const orderDiv = document.createElement('div');
    orderDiv.className = 'border border-green-200 p-2 rounded mb-2';
    orderDiv.innerText = `Price: ${order.price}, Quantity: ${order.quantity}`;
    sellOrdersDiv.appendChild(orderDiv);
  });*/
}

fetchMarketOrders();





    
$(document).ready(function () {
   

  $delay=5000


    Highcharts.setOptions({
        global: {
            useUTC: false
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: true
                }
            }
        },
        tooltip: {
            enabled: true
        }
    });

    $('#container').highcharts({
        chart: {
            type: 'area',
            zoomType:'xy',
            backgroundColor: ' #26044a',

            events: {
                load: function () {
                    var buy = this.series[1];
                    var sell = this.series[0];
                   
                    var points1= [];
                    var points2 = [];
                    // fetching sensor data from API
                   
                  /*  setInterval(function () {
                        $.getJSON('http://localhost:3000/orders/market-orders', function (data) {
                            const buyOrders = data.buyOrders;
                         

                           
                          
                                
                            for (var i = 0; i < buyOrders.length; i++) {
                                const p = parseFloat(buyOrders[i].price);
                                const q = parseFloat(buyOrders[i].quantity);
                                points1.push([p, q]);
                              }
                                    
                             
                              buy.setData(points1);
                              sell.setData(points2);
                              console.log(points1)
                            
                        });
                    }, 5000);*/
                }
            }
            
        },
        
        title: {
            text: ' MarketPlace',
           style:{
            color:'white',
           }
        },

        xAxis: {
            minPadding: 0,
            maxPadding: 0,
          
           
            plotLines: [{
              color: '#888',
              value: 10,
              width: 1,
              label: {
                text: 'Actual price',
                rotation: 90
              }
            }],
            title: {
              text: 'Price'
            }
          },
          yAxis: [{
            lineWidth: 1,
            gridLineWidth: 1,
            title: null,
           
            tickWidth: 1,
            tickLength: 5,
            tickPosition: 'inside',
            labels: {
              align: 'left',
              x: 8
            }
          }, {
            opposite: true,
            linkedTo: 0,
            lineWidth: 1,
            gridLineWidth: 0,
            title: null,
            
            tickWidth: 1,
            tickLength: 5,
            tickPosition: 'inside',
            labels: {
              align: 'right',
              x: -8
            }
          }],
          legend: {
            enabled: true
          },
          plotOptions: {
            area: {
              fillOpacity: 0.2,
              lineWidth: 10,
              step: 'center'
            }
          },
        tooltip: {
            shared:true,
            headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
        },
        series: [ {
            name: 'sell',
            data:[[100,5],[110,9],[140,20],[145,35],[150,75],[155,85],[160,120],[170,129],[175,200],[200,500]],
            opacity:0.5,
            yAxis: 0,
            color: '#90ee7e',
            lineWidth: 2,
            marker: {
                enabled: true,
                radius: 4,
                fillColor: '#FFFFFF',
                lineWidth: 2,
                lineColor: '#90ee7e'
            }
        },
        {
            name: 'buy',
            data: [[10,400],[15,370],[30,350],[50,150],[70,125],[85,100],[90,90],[95,50],[100,5]],
            opacity:0.5,
            color: '#2b908f',
            lineWidth: 2,
            marker: {
                enabled: true,
                radius: 4,
                fillColor: '#FFFFFF',
                lineWidth: 2,
                lineColor: '#2b908f'
            }
        }]

    });
})