import React from 'react';
import styled from 'styled-components';

const ToppingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const ToppingCheckbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
`;

export function Toppings({ toppings, checkTopping }) {
  return (
    <ToppingGrid>
      {toppings.map((topping, i) => (
        <CheckboxLabel>
          <ToppingCheckbox
            key={i}
            type="checkbox"
            checked={topping.checked}
            onChange={() => {
              checkTopping(i);
            }}
          />
          {topping.name}
        </CheckboxLabel>
      ))}
    </ToppingGrid>
  );
}
