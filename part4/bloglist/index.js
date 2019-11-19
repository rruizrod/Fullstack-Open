const app = require("./app");
const http = require("http");
const config = require("./utils/config");

console.log("Connecting to", config.MONGODB_URI);

app.listen(config.PORT, () => {
  console.log("Listening on port:", config.PORT);
});
