// require your server and launch it
const server = require('./api/server.js');

const port = 2000;

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});