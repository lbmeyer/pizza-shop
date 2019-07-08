import React from 'react';
import styled from 'styled-components';
import { Title } from '../Styles/title';
import { pizzaRed } from '../Styles/colors';

const QuantityInputStyled = styled.input`
  font-size: 18px;
  width: 22px;
  text-align: center;
  border: none;
  outline: none;
`;

const IncrementContainer = styled.div`
  display: flex;
  height: 24px;
`;

const IncrementButton = styled.div`
  width: 25px;
  height: 25px;
  color: ${pizzaRed};
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  vertical-align: center;
  line-height: 23px;
  margin: 0px 10px;
  border: 1px solid ${pizzaRed};
  border-radius: 50%;
  ${({ disabled }) =>
    disabled &&
    `opacity: 0.5; 
     pointer-events: none; 
     `}
  &:hover {
    background-color: #ffe3e3;
  }
`;

export function QuantityInput({ quantity }) {
  return (
    <IncrementContainer>
      <div>Quantity: </div>
      <IncrementButton
        onClick={() => {
          quantity.setValue(quantity.value - 1);
        }}
        disabled={quantity.value === 1}
      >
        -
      </IncrementButton>
      <QuantityInputStyled {...quantity} />
      <IncrementButton
        onClick={() => {
          quantity.setValue(quantity.value + 1);
        }}
      >
        +
      </IncrementButton>
    </IncrementContainer>
  );
}
