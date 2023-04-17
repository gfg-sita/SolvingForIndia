


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

    $('#sensorData').highcharts({
        chart: {
            type: 'spline',
           
            backgroundColor: '#4a0528',
            events: {
                load: function () {
                    var Ph = this.series[0];
                    var Moisture = this.series[1];
                    var Temperature = this.series[2];
                    var x, ph, moisture, temperature;

                    // fetching sensor data from API

                    setInterval(function () {
                        $.getJSON('http://localhost:3000/sensor/environment-data', function (data) {

                            console.log(data);
                            x = (new Date()).getTime(),
                                ph = data.ph,
                                moisture = data.moisture,
                                temperature = data.temperature;
                                console.log(temperature)


                            Ph.addPoint([x, ph], true, true);
                            Moisture.addPoint([x, moisture], true, true);
                            Temperature.addPoint([x, temperature], true, true);

                            
                        });
                    }, $delay);
                }
            }
            
        },
        
        title: {
            text: 'Environment Data',
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
                text: 'Ph',
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
                text: 'Moisture',
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
                text: 'Temperature',
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
            name: 'Ph',
            data: [7,7],
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
            name: 'Moisture',
            data: [0,0],
           
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
            name: 'Temperature',
            data: [30,30],
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

  