// main.js

"use strict";

var extend = require('extend');

function Main() {
  console.log('Main');
  console.log(global);
}

extend(Main.prototype, {});

document.addEventListener('DOMContentLoaded', function(e) {
  console.log(document);
  new Main();
});
