const http = require("http");
const server = http.createServer(function (req, res) {
  if (req.url === "/secretData") {
    res.end("There is no secret data you fool");
  } else {
    res.end("Hello World");
  }
});
server.listen(1432);
