export function formatPrice(price) {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}

export const foodItems = [
  {
    name: 'Cheese Pizza',
    img: '/img/pizza.png',
    section: 'Pizza',
    price: 8.99
  },
  {
    name: 'Pepperoni Pizza',
    img: '/img/pizza2.jpeg',
    section: 'Pizza',
    price: 9.99
  },
  {
    name: 'Chicken Pizza',
    img: '/img/chicken-pizza.jpeg',
    section: 'Pizza',
    price: 12.99
  },
  {
    img: '/img/healthy-pizza.jpeg',
    name: 'Veggie Pizza',
    section: 'Pizza',
    price: 8.99
  },
  {
    img: '/img/burger.jpeg',
    name: 'Burger',
    section: 'Sandwich',
    price: 5.99
  },
  { img: '/img/gyro.jpeg', name: 'Gyro', section: 'Sandwich', price: 4.5 },
  {
    img: '/img/sandwich.jpeg',
    name: 'Shrimp PoBoy',
    section: 'Sandwich',
    price: 6.99
  },
  {
    img: "/img/meatball-sandwich.jpg",
    name: "Meatball Sandwich",
    section: "Sandwich",
    price: 6.99
  },
  {
    img: '/img/fries.jpeg',
    name: 'Fries',
    section: 'Sides',
    price: 1.99
  },
  {
    img: '/img/soft-drinks-2.jpg',
    price: 0.99,
    name: 'Soda',
    section: 'Drinks',
    choices: ['Coke', 'Sprite', 'Root Beer']
  }
];

export const foods = foodItems.reduce((res, food) => {
  // if we don't have a "section" inside our empty object
  if (!res[food.section]) {
    // add in food.section as the key
    res[food.section] = [];
  }
  res[food.section].push(food);
  return res;
}, {});
