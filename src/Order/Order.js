import React from 'react';
import styled from 'styled-components';
import { DialogContent, DialogFooter, ConfirmButton } from '../FoodDialog/FoodDialog';

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

const OrderFooter = styled.div`

`;

export function Order() {
  return (
    <OrderStyled>
      <OrderContent>
        Your Order's looking pretty empty
      </OrderContent>
      <DialogFooter>
        <ConfirmButton>Confirm</ConfirmButton>
      </DialogFooter>
  </OrderStyled>
  )
}
