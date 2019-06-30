import React, { useState } from 'react';
import { Navbar } from './Navbar/Navbar';
import { Banner } from './Banner/Banner';
import { Menu } from './Menu/Menu';
import { GlobalStyle } from './Styles/GlobalStyle';
import { FoodDialog } from './FoodDialog/FoodDialog';
import useToggle from './CustomHooks/useToggle';

function App() {
  const [openFood, setOpenFood] = useState({});
  const [isOpen, setIsOpen] = useToggle(false);

  return (
    <>
      <GlobalStyle />
      <FoodDialog
        openFood={openFood}
        setOpenFood={setOpenFood}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Navbar />
      <Banner />
      {/* <div>{openFood ? openFood.name : openFood}</div> */}
      <Menu setOpenFood={setOpenFood} setIsOpen={setIsOpen} />
    </>
  );
}

export default App;
