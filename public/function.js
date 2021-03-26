// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
  if (event) {
    console.info('DOM loaded')
  }
});


    // Create function
    const createBurgerBtn = document.querySelector('.add');
  
    if (createBurgerBtn) {
      createBurgerBtn.addEventListener('submit', (e) => {
        e.preventDefault();
  
        // Finds textarea value with the same name as burger
        const newBurger = {
          name: document.getElementById('ca').value.trim(),
        };
  
        // Send POST request 
        fetch('/api/burgers', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
  
          // Serialize JSON body
          body: JSON.stringify(newBurger),
        }).then(() => {

          // Empty form
          document.getElementById('ca').value = '';
  
          // Reload the page so the user can see the new burger
          console.log('Sending this burger to the database: ', newBurger);
          location.reload();
        });
      });
    }

    // UPDATE
  const devourBtns = document.querySelectorAll('.devour');

  // Set up the event listener for the Devour button
  if (devourBtns) {
    devourBtns.forEach((button) => {
      button.addEventListener('click', (e) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute('data-id');
        const newDevourState = {
          devoured: true,
        };

        fetch(`/api/burgers/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          // Serialize the JSON body
          body: JSON.stringify(newDevourState),
        }).then((response) => {
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.ok) {
            console.log(`changed devoured state to: ${true}`);
            location.reload('/');
          } else {
            alertError();
          }
        });
      });
    });
  };