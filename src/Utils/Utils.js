const pricePerTopping = 0.5;

export function formatPrice(price) {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}

export function getPrice(order) {
  // if order has toppings, we add up all the costs of toppings + cost of pizza.
  // if not, orderPrice is simply the cost of non-pizza item
  const orderPrice = order.toppings
    ? order.price +
      order.toppings.filter(topping => topping.checked).length * pricePerTopping
    : order.price;

  return order.quantity * orderPrice;
}

export function getOrderQty(orders) {
  const orderQty = orders.reduce((acc, currentValue) => {
    return acc + currentValue.quantity;
  }, 0);

  return orderQty;
}
