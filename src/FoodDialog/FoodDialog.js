import React from 'react';
import styled from 'styled-components';
import { FoodLabel } from '../Menu/FoodGrid';
import { pizzaRed } from '../Styles/colors';
import { Title } from '../Styles/title';
import { formatPrice } from '../Data/FoodData';
import { QuantityInput } from './QuantityInput';
import { useQuantity } from '../Hooks/useQuantity';
import { Toppings } from './Toppings';
import { useToppings } from '../Hooks/useToppings';

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
  padding: 0px 40px 60px;
`;

export const DialogFooter = styled.div`
  box-shadow: 0px -2px 10px 0 grey;
  height: 60px;
  display: flex;
  justify-content: center;
`;

export const ConfirmButton = styled(Title)`
  font-family: 'Righteous', cursive;
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
  /* ${({ img }) =>
    img ? `background-image: url(${img});` : `min-height: 75px;`} */
  background-position: center;
  background-size: cover;
`;

const DialogBannerName = styled(FoodLabel)`
  top: 100px;
  font-size: 30px;
  padding: 5px 40px;
`;

const pricePerTopping = 0.5;

export function getPrice(order) {
  return (
    order.quantity *
    (order.price +
      order.toppings.filter(topping => topping.checked).length * pricePerTopping)
  );
}

function hasToppings(food) {
  return food.section === 'Pizza';
}

function FoodDialogContainer({ openFood, setOpenFood, setOrders, orders }) {
  const quantity = useQuantity(openFood && openFood.quantity);
  const toppings = useToppings(openFood.toppings);

  function close() {
    // pass in empty arguments to setOpenFood. openFood will be empty,
    // thereby returning null in if statement below (and not our modal)
    setOpenFood();
  }
  if (!openFood) return null;

  const order = {
    ...openFood,
    quantity: quantity.value,
    toppings: toppings.toppings
  };

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
          <QuantityInput quantity={quantity} />
          {hasToppings(openFood) && (
            <>
              <h3>Would you like toppings?</h3>
              <Toppings {...toppings} />
            </>
          )}
        </DialogContent>
        <DialogFooter>
          <ConfirmButton onClick={addToOrder}>
            Add to Order: {formatPrice(getPrice(order))}
          </ConfirmButton>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export function FoodDialog(props) {
  if (!props.openFood) return null;
  return <FoodDialogContainer {...props} />;
}
