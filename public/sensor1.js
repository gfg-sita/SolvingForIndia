


$(document).ready(function () {
    var $delay = 5000,
        totalPoints = 25,
        $voltageDisplay = $('div.volts'),
        $currentDisplay = $('div.amps'),
        $moistureDisplay = $('div.moisture');

    function updateVoltage(value) {
       
    }

    function updateCurrent(value) {
       
    }

    function updateMoisture(value) {
      
    }

    function updateSensorDisplayValues(d) {
        updateVoltage(d.voltage);
        updateCurrent(d.current);
        updateMoisture(d.moisture);
    }

    Highcharts.setOptions({
        global: {
            useUTC: false
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        tooltip: {
            enabled: true
        }
    });

    $('#sensorData1').highcharts({
        chart: {
            type: 'spline',
            backgroundColor: '#4a0528',
            events: {
                load: function () {
                    var Nitrogen = this.series[0];
                    var Phosphorus = this.series[1];
                    var Pottasium = this.series[2];
                    var x, nitrogen, phosphorus, pottasium;

                    // fetching sensor data from API

                    setInterval(function () {
                        $.getJSON('http://localhost:3000/sensor/nutrient-data', function (data) {

                            console.log(data);
                            x = (new Date()).getTime(),
                                nitrogen = data.nitrogen,
                                phosphorus = data.phosphorous,
                                potasium = data.potassium;
                                console.log(potasium)


                            Nitrogen.addPoint([x, nitrogen], true, true);
                            Phosphorus.addPoint([x, phosphorus], true, true);
                            Pottasium.addPoint([x, potasium], true, true);

                            
                        });
                    }, $delay);
                }
            }
            
        },
        
        title: {
            text: 'Sensor Data',
            style: {
                color: 'white',
               
             }
        },

        xAxis: {
            type: 'datetime',
            tickPixelInterval: 500
        },
        yAxis: [{
            title: {
                text: 'Nitrogen',
                style: {
                    color: '#2b908f',
                    font: '13px sans-serif'
                }
            },

          
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        }, {
            title: {
                text: 'Phosphorus',
                style: {
                    color: '#90ee7e',
                    font: '13px sans-serif'
                },

            },

           
            opposite: true,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        }, {
            title: {
                text: 'Pottasium',
                style: {
                    color: '#f45b5b',
                    font: '13px sans-serif'
                }
            },

           
            opposite: true,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        }],
        tooltip: {
            shared:true,
            headerFormat: '<span style="font-size=10px;">Time: {point.key}</span><br/>',
        },
        series: [{
            name: 'Nitrogen',
            data: [255,255],
            color: '#2b908f',
            lineWidth: 2,
            marker: {
                enabled: true,
                radius: 4,
                fillColor: '#FFFFFF',
                lineWidth: 2,
                lineColor: '#2b908f'
            }
        }, {
            name: 'Phosphorus',
            data: [255,255],
           
            color: '#90ee7e',
            lineWidth: 2,
            marker: {
                enabled: true,
                radius: 4,
                fillColor: '#FFFFFF',
                lineWidth: 2,
                lineColor: '#90ee7e'
            }
        }, {
            name: 'Pottasium',
            data: [255,255],
            yAxis: 2,
            color: '#f45b5b',
            lineWidth: 2,
            marker: {
                enabled: true,
                radius: 4,
                fillColor: '#FFFFFF',
                lineWidth: 2,
                lineColor: '#f45b5b'
            }
        }]

    });
});

  