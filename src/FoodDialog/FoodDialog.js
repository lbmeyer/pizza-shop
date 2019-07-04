import React from 'react';
import styled from 'styled-components';
import { FoodLabel } from '../Menu/FoodGrid';
import { pizzaRed } from '../Styles/colors';
import { Title } from '../Styles/title';

const Dialog = styled.div`
  width: 500px;
  background: #fff;
  position: fixed;
  top: 75px;
  z-index: 5;
  max-height: calc(100% - 100px);
  left: calc(50% - 250px); /* center on page */
  display: flex;
  flex-direction: column;
`;

export const DialogContent = styled.div`
  overflow: auto; /* Make content in Dialog box scrollable  */
  min-height: 100px;
`;

export const DialogFooter = styled.div`
  box-shadow: 0px -2px 10px 0 grey;
  height: 60px;
  display: flex;
  justify-content: center;
`;

export const ConfirmButton = styled(Title)`
  font-family: 'Righteous',cursive;
  margin: 10px;
  padding: 10px 30px;
  color: #fff;
  height: 20px;
  /* border-radius: 10px; */
  text-align: center;
  cursor: pointer;
  display: inline-block;
  background: ${pizzaRed};
`;

const DialogShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: black;
  opacity: 0.7;
  z-index: 4;
`;

const DialogBanner = styled.div`
  min-height: 200px;
  margin-bottom: 20px;
  ${({ img }) => `background-image: url(${img});`}
  /* ${({ img }) => (img ? `background-image: url(${img});` : `min-height: 75px;`)} */
  background-position: center;
  background-size: cover;
`;

const DialogBannerName = styled(FoodLabel)`
  top: 100px;
  font-size: 30px;
  padding: 5px 40px;
`;

export function FoodDialog({ openFood, setOpenFood, setOrders, orders }) {
  function close() {
    // pass in empty arguments to setOpenFood. openFood will be empty, 
    // thereby returning null in if statement below (and not our modal)
    setOpenFood();
  }
  if (!openFood) return null;

  const order = {
    name: openFood.name
  }

  function addToOrder() {
    setOrders([...orders, order]);
    close();
  }

  return (
    <>
      <DialogShadow onClick={close} />
      <Dialog>
        <DialogBanner img={openFood.img}>
          <DialogBannerName>{openFood.name}</DialogBannerName>
        </DialogBanner>
        <DialogContent>
  
        </DialogContent>
        <DialogFooter>
          <ConfirmButton onClick={addToOrder}>Add to Order</ConfirmButton>
        </DialogFooter>
      </Dialog>
    </>
  );
}
