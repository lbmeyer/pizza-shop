import React, { useState } from 'react';
import { Navbar } from './Navbar/Navbar';
import { Banner } from './Banner/Banner';
import { Menu } from './Menu/Menu';
import { GlobalStyle } from './Styles/GlobalStyle';
import { FoodDialog } from './FoodDialog/FoodDialog';
import { Order } from './Order/Order';
import { useOpenFood } from './Hooks/useOpenFood';
import { useOrders } from './Hooks/useOrders';
import { useTitle } from './Hooks/useTitle';
import useToggle from './Hooks/useToggle';


function App() {
  // const [isOpen, setIsOpen] = useToggle(false);
  const openCart = useToggle(false);
  const openFood = useOpenFood();
  const orders = useOrders();
  useTitle({...openFood, ...orders});

  return (
    <>
      <GlobalStyle />
      <FoodDialog {...openFood} {...orders} />
      <Navbar {...openCart} {...orders}/>
      <Order {...orders} {...openFood} {...openCart}/>
      <Banner />
      <Menu {...openFood}/>
    </>
  );
}

export default App;
