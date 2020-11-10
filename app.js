const viewer = require("./viewer.js");
const { interTime } = require("./config.js");


viewer();

setTimeout(() => {
  viewer();
}, interTime);
