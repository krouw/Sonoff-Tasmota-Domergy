var aedes = require('aedes')()
var server = require('net').createServer(aedes.handle)
const { StringDecoder } = require('string_decoder');
var port = 1883
const decoder = new StringDecoder('utf8');

server.listen(port, function () {
  console.log('server listening on port', port)
})

aedes.on('client', function (client) {
  console.log('new client', client.id)
})

aedes.on('publish', function ( packet, client) {
  console.log('packet',packet)
  console.log('payload',decoder.write(packet.payload))
})
