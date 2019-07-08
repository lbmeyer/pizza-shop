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
  top: 74px;
  width: 380px;
  background-color: #fff;
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
  `
      : `
    pointer-events: none;
  `}
`;

const OrderItem = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: 30px 150px 20px 60px;
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
  /* background: ${pizzaRed}; */
  padding: 5px;
  font-size: 18px;
  top: 5px;
  right: 5px;
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
                <div>{order.quantity + ' '}x</div>
                <div>{order.name}</div>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={e => {
                    // prevent bubbling up to parent,
                    // which in turn will trigger modal open
                    e.stopPropagation();
                    deleteItem(index);
                  }}
                >
                  🗑
                </div>
                <div>{formatPrice(getPrice(order))}</div>
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
              {order.choice && <DetailItem>{order.choice}</DetailItem>}
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
