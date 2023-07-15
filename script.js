// Function to fetch food items from JSON and display them
function getMenu() {
  fetch('food.json')
    .then(response => response.json())
    .then(data => {
      const foodGrid = document.querySelector('.food-grid');
      data.forEach((item, index) => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        const image = document.createElement('img');
        image.src = item.imgSrc;
        const name = document.createElement('h3');
        name.textContent = item.name;
        const price = document.createElement('p');
        price.textContent = '$' + item.price.toFixed(2);
        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.addEventListener('click', () => {
          addToCart(item);
        });
        foodItem.appendChild(image);
        foodItem.appendChild(name);
        foodItem.appendChild(price);
        foodItem.appendChild(addButton);
        
        // Insert the items at the 26th and 27th positions
        if (index === 0) {
          foodGrid.appendChild(foodItem);
        } else if (index === 1) {
          const existingItem = foodGrid.children[25]; // Position of the 26th item
          foodGrid.insertBefore(foodItem, existingItem);
        } else {
          foodGrid.appendChild(foodItem);
        }
      });
    })
    .catch(error => {
      console.log('Error fetching food items:', error);
    });
}

// Function to add selected item to the cart
function addToCart(item) {
  // Add the logic to add the selected item to the cart
  console.log('Item added to cart:', item);
}

// Function to filter food items based on search query
function filterFoodItems(query) {
  const foodItems = document.querySelectorAll('.food-item');
  foodItems.forEach(item => {
    const name = item.querySelector('h3').textContent.toLowerCase();
    if (name.includes(query.toLowerCase())) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Function to handle the search input
function handleSearchInput() {
  const searchInput = document.querySelector('#search-input');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    filterFoodItems(query);
  });
}

// Function to randomly select elements from an array
function getRandomElements(arr, num) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

// Function to take an order
function takeOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch('burgers.json')
        .then(response => response.json())
        .then(data => {
          const burgers = data.burgers;
          const selectedBurgers = getRandomElements(burgers, 3);
          const order = {
            burgers: selectedBurgers,
            order_status: true,
            paid: false
          };
          resolve(order);
        })
        .catch(error => {
          reject(error);
        });
    }, 2500);
  });
}

// Function to prepare the order
function orderPrep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = {
        order_status: true,
        paid: false
      };
      resolve(order);
    }, 1500);
  });
}

// Function to pay for the order
function payOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = {
        order_status: true,
        paid: true
      };
      resolve(order);
    }, 1000);
  });
}

// Function to display a thank you message
function thankyouFnc() {
  alert('Thank you for eating with us today!');
}

// Function to handle the promises
function handlePromises() {
  takeOrder()
    .then(order => {
      console.log('Order:', order);
      return orderPrep();
    })
    .then(order => {
      console.log('Order prepared:', order);
      return payOrder();
    })
    .then(order => {
      console.log('Order paid:', order);
      thankyouFnc();
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Run getMenu function on page load
window.onload = () => {
  getMenu();
  handleSearchInput();
  handlePromises();
};
