const { response } = require("express");
const { create } = require("express-handlebars");

// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
  if (event) {
    console.info('DOM loaded')
  }
});

// CREATE NEW BURGER
const formButton = document.querySelector("#addburger");

if (formButton) {
  formButton.addEventListener("submit", function(event){
    event.preventDefault();
  })

  var newBurger = {
    burger_name: document.getElementById("newburger").val().trim(),
    devoured: 0
  };

  fetch("/api/burgers", {
    type: "POST",
    data: newBurger
  }).then(() => {
      console.log('Added new burger');
      location.reload();
  });
};