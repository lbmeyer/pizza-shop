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

const OrderStyled = styled.div`
  position: fixed;
  right: 0;
  top: 48px;
  width: 340px;
  background-color: #fff;
  height: calc(100% - 48px);
  z-index: 10;
  box-shadow: 4px 0px 5px 4px grey;
  display: flex;
  flex-direction: column;
`;

const OrderContent = styled(DialogContent)`
  padding: 20px;
  height: 100%;
`;

const OrderContainer = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid grey;
`;

const OrderItem = styled.div`
  padding: 10px 0;
  display: grid;
  grid-template-columns: 20px 150px 20px 60px;
  justify-content: space-between;
`;

const DetailItem = styled.div`
  color: gray;
  font-size: 10px;
`;

const OrderFooter = styled.div``;

export function Order({ orders }) {
  const subtotal = orders.reduce((total, order) => {
    return total + getPrice(order);
  }, 0);

  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <OrderStyled>
      {orders.length === 0 ? (
        <OrderContent>Your Order's looking pretty empty</OrderContent>
      ) : (
        <OrderContent>
          <OrderContainer>Your Order: </OrderContainer>{" "}
          {orders.map(order => (
            <OrderContainer>
              <OrderItem>
                <div>{order.quantity}</div>
                <div>{order.name}</div>
                <div></div>
                <div>{formatPrice(getPrice(order))}</div>
              </OrderItem>
              <DetailItem>
                {order.toppings
                  .filter(topping => topping.checked)
                  .map(topping => topping.name)
                  .join(", ")
                }
              </DetailItem>
            </OrderContainer>
          ))}
          <OrderContainer>
            <OrderItem>
              <div/>
              <div>Sub-Total</div>
              <div>{formatPrice(subtotal)}</div>
            </OrderItem>
            <OrderItem>
              <div/>
              <div>Tax</div>
              <div>{formatPrice(tax)}</div>
            </OrderItem>
            <OrderItem>
              <div/>
              <div>Total</div>
              <div>{formatPrice(total)}</div>
            </OrderItem>
          </OrderContainer>
        </OrderContent>
      )}
      <DialogFooter>
        <ConfirmButton>Confirm</ConfirmButton>
      </DialogFooter>
    </OrderStyled>
  );
}
