const express = require("express");
const sever = express();

function keep_alive() {
    sever.listen(3000, () => {console.log("sever is online")});
}

module.exports = keep_alive;