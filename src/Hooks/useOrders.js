import { useState } from 'react';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  console.log(orders);
  
  const orderQty = orders.reduce((acc, currentValue) => {
    return acc + currentValue.quantity;
  }, 0)

  return {
    orders,
    setOrders, 
    orderQty
  }
}