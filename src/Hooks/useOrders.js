import { useState, useEffect } from 'react';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  
  // useEffect(() => {
  //   let orderQty = orders.reduce((acc, currentValue) => {
  //     return acc + currentValue.quantity;
  //   }, 0);
  // }, [orders])

  return {
    orders,
    setOrders, 
    // orderQty
  }
}