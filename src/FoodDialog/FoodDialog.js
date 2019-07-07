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
import { useChoice } from '../Hooks/useChoice';
import { Choices } from './Choices';

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
  ${({disabled}) => disabled &&
  `
    opacity: .5;
    background-color: grey;
    pointer-events: none; 
  `
  }
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
  /* ${({ img }) => `background-image: url(${img});`} */
  ${({ img }) =>
    img ? `background-image: url(${img});` : `min-height: 75px;`}
  background-position: center;
  background-size: cover;
`;

const DialogBannerName = styled(FoodLabel)`
  font-size: 30px;
  padding: 5px 40px;
  top: ${({img}) => (img ? `100px` : `20px`)};
  bottom: inherit;
    right: 0;
`;

const pricePerTopping = 0.5;

// const defaultToppings = [
//   {name: "Extra Cheese1", checked: false},
//   {name: "Pepperoni", checked: false},
//   {name: "Sausage", checked: false},
//   {name: "Onions", checked: false},
//   {name: "Peppers", checked: false},
//   {name: "Pineapple", checked: false},
//   {name: "Ham", checked: false},
//   {name: "Spinach", checked: false},
//   {name: "Artichokes", checked: false},
//   {name: "Mushrooms", checked: false},
//   {name: "Anchovies", checked: false},
// ]


export function getPrice(order) {
  // if order has toppings, we add up all the costs of toppings + cost of pizza. 
  // if not, orderPrice is simply the cost of non-pizza item
  const orderPrice = order.toppings ? 
    (order.price + order.toppings.filter(topping => topping.checked).length * pricePerTopping) 
    : order.price
  
  return (
    order.quantity * orderPrice
  );
}

// only show toppings if order pizza
function hasToppings(food) {
  // debugger;
  return food.section === 'Pizza';
}

function FoodDialogContainer({ openFood, setOpenFood, setOrders, orders }) {
  const quantity = useQuantity(openFood && openFood.quantity);
  const toppings = useToppings(openFood.toppings);
  const choiceRadio = useChoice(openFood.choice);
  const isEditing = openFood.index > -1;

  
  function close() {
    // pass in empty arguments to setOpenFood. openFood will be empty,
    // thereby returning null in if statement below (and not our modal)
    setOpenFood();
  }
  if (!openFood) return null;
  
  const order = {
    ...openFood, 
    quantity: quantity.value,
    toppings: (hasToppings(openFood) ? toppings.toppings : null),
    choice: choiceRadio.value
  }
  
  function editOrder() {
    const newOrders = [...orders];
    newOrders[openFood.index] = order;
    setOrders(newOrders);
    close();
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
          <QuantityInput quantity={quantity} />
          {hasToppings(openFood) && (
            <>
              <h3>Would you like toppings?</h3>
              <Toppings {...toppings} />
            </>
          )}
          {openFood.choices && <Choices openFood={openFood} choiceRadio={choiceRadio} />}
        </DialogContent>
        <DialogFooter>
          <ConfirmButton onClick={isEditing ? editOrder : addToOrder} disabled={openFood.choices && !choiceRadio.value} >
            {isEditing ? `Update Order: ` : `Add to Order: `} 
            {formatPrice(getPrice(order, openFood))}
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
