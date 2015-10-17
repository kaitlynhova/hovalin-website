var path = require('path');
var ghost = require('./ghost-hovalin');

ghost({
  config: path.join(__dirname, 'config.js')
}).then(function (ghostServer) {
  ghostServer.start();
});
