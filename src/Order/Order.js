import React from 'react';
import styled from 'styled-components';
import { formatPrice } from '../Data/FoodData';
// import { Toppings } from '../FoodDialog/Toppings';
import {
  DialogContent,
  DialogFooter,
  ConfirmButton,
  getPrice
} from '../FoodDialog/FoodDialog';
import { pizzaRed } from '../Styles/colors';

const OrderWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 72px;
  width: 380px;
  background-color: floralwhite;
  height: calc(100% - 48px);
  z-index: 10;
  box-shadow: 4px 0px 5px 4px grey;
  display: flex;
  flex-direction: column;
  transform: translateX(380px);
  transition: transform .3s ease-in;

  ${({isOpen}) => isOpen && `
    transform: translateX(0);
  `}
`;

const OrderContent = styled(DialogContent)`
  padding: 50px 25px;
  height: 100%;
`;

const EditMessage = styled.div`
  font-size: 9px;
  padding: 5px;
  position: absolute;
  top: -10px;
  left: 5px;
  opacity: 0;
  color: #ff5722
`;

const OrderContainer = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #e2e2e2;

  ${({ editable }) =>
    editable
      ? `
    &:hover {
      cursor: pointer;
      background-color: #f2f2f2;
    }

    &:hover ${EditMessage} {
        opacity: 1;
      }
  `
      : `
    pointer-events: none;
  `}
`;


const OrderItem = styled.div`
  position: relative;
  padding: 10px;
  display: grid;
  grid-template-columns: 30px 150px 60px 20px;
  justify-content: space-between;
  align-items: center;
`;

const DetailItem = styled.div`
  color: gray;
  font-size: 10px;
  padding: 0 10px 10px 10px;
  display: grid;
  /* justify-content: space-between; */
  grid-template-columns: 48px 1fr;
  line-height: 1.6;
`;

const OrderFooter = styled(DialogFooter)`
    bottom: 40px;
    position: relative;
`;

const CloseOrderBtn = styled.div`
  position: absolute;
  width: 25px;
  color: ${pizzaRed};
  font-size: 22px;
  top: 10px;
  right: 10px;
  cursor: pointer;
  text-align: center;
`;

const OrderHeader = styled.div`
  color: ${pizzaRed};
  display: inline-block;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
`;

const DeleteIcon = styled.svg`
  width: 20px;
  fill: #777;
  cursor: pointer;
  transition: all .2s linear;

  &:hover {
    fill: red;
  }
`;

export function Order({ orders, setOrders, setOpenFood, isOpen, toggleOpen }) {
  const subtotal = orders.reduce((total, order) => {
    return total + getPrice(order);
  }, 0);

  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  const deleteItem = index => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  };


  return (
    <OrderWrapper isOpen={isOpen}>
      <CloseOrderBtn onClick={toggleOpen}>x</CloseOrderBtn>
      {orders.length === 0 ? (
        <OrderContent>Your Order's looking pretty empty</OrderContent>
      ) : (
        <OrderContent>
          <OrderContainer><OrderHeader>Your Order:</OrderHeader> </OrderContainer>{' '}
          {orders.map((order, index) => (
            <OrderContainer editable>
              <OrderItem
                onClick={() => {
                  setOpenFood({ ...order, index });
                }}
              >
                <EditMessage>Edit Order</EditMessage>
                <div>{order.quantity + ' '}x</div>
                <div>{order.name}</div>
                <div>{formatPrice(getPrice(order))}</div>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={e => {
                    // prevent bubbling up to parent,
                    // which in turn will trigger modal open
                    e.stopPropagation();
                    deleteItem(index);
                  }}
                >
                  <DeleteIcon viewBox="0 0 24 24">
                    <path d="M18.5 15c-2.484 0-4.5 2.015-4.5 4.5s2.016 4.5 4.5 4.5c2.482 0 4.5-2.015 4.5-4.5s-2.018-4.5-4.5-4.5zm2.5 5h-5v-1h5v1zm-5-11v4.501c-.748.313-1.424.765-2 1.319v-5.82c0-.552.447-1 1-1s1 .448 1 1zm-4 0v10c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1zm1.82 15h-11.82v-18h2v16h8.502c.312.749.765 1.424 1.318 2zm-6.82-16c.553 0 1 .448 1 1v10c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1zm14-4h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711v2zm-1 2v7.182c-.482-.115-.983-.182-1.5-.182l-.5.025v-7.025h2z"/>
                  </DeleteIcon>
                </div>
              </OrderItem>
              {order.toppings ? (
                <DetailItem>
                  <div/>
                  <div>
                    {order.toppings
                      .filter(topping => topping.checked)
                      .map(topping => topping.name)
                      .join(', ')}
                  </div>
                </DetailItem>
              ) : null}
              {order.choice && 
                <DetailItem>
                  <div/>
                  <div>{order.choice}</div>
                </DetailItem>}
            </OrderContainer>
          ))}
          <OrderContainer>
            <OrderItem>
              <div />
              <div>Sub-Total</div>
              <div>{formatPrice(subtotal)}</div>
            </OrderItem>
            <OrderItem>
              <div />
              <div>Tax</div>
              <div>{formatPrice(tax)}</div>
            </OrderItem>
            <OrderItem>
              <div />
              <div>Total</div>
              <div>{formatPrice(total)}</div>
            </OrderItem>
          </OrderContainer>
        </OrderContent>
      )}
      <OrderFooter>
        <ConfirmButton>Confirm</ConfirmButton>
      </OrderFooter>
    </OrderWrapper>
  );
}
