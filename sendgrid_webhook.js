var localtunnel = require('localtunnel');
localtunnel(8000, { subdomain: "lsdfnsdfkljiweo" }, function(err, tunnel) {
  console.log('LT running')
});