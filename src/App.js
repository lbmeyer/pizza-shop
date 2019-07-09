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
import { useAuthentication } from './Hooks/useAuthentication';

function App() {
  // const [isOpen, setIsOpen] = useToggle(false);
  const openCart = useToggle(false);
  const openFood = useOpenFood();
  const orders = useOrders();
  const auth = useAuthentication();
  useTitle({...openFood, ...orders});

  return (
    <>
      <GlobalStyle />
      <FoodDialog {...openFood} {...orders} />
      <Navbar {...openCart} {...orders} {...auth} />
      <Order {...orders} {...openFood} {...openCart} {...auth} />
      <Banner />
      <Menu {...openFood}/>
    </>
  );
}

export default App;
