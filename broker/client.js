const mqtt = require('mqtt')

const client  = mqtt.connect('mqtt://localhost:1883', {
     clientId: 'prueba',
    })


client.on('connect', function () {
  client.subscribe('tele/sonoff/#')
  console.log('Cliente conectado');
})


client.on('message', function (topic, message) {
  // message is Buffer
  console.log('message', message.toString())
})

//client.publish( 'cmnd/sonoff/power', 'toggle')
  //client.publish('cmnd/sonoff/SetOption21', '1')
/*
  setInterval( () => {
    client.publish( 'cmnd/sonoff/PowerCal')
  }, 10000 ) */

//client.publish('cmnd/sonoff/TelePeriod', '10')
