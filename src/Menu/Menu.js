import React from 'react';
import styled from "styled-components";
import { foodItems } from '../Data/FoodData';
import { Food, FoodGrid, FoodLabel } from './FoodGrid';

// import { foods } from "../Data/FoodData";
// import { Food, FoodGrid, FoodLabel } from "./FoodGrid";
// import { formatPrice } from "../Data/FoodData";

const MenuStyled = styled.div`
  height: 1000px;
  margin: 0px 400px 50px 20px;
`;

export function Menu() {
  return <MenuStyled>
    <h1>Menu</h1>
    <FoodGrid>
      {foodItems.map(foodItem => (
        <Food img={foodItem.img}>
          <FoodLabel>{foodItem.name}</FoodLabel>
        </Food>
      ))}
    </FoodGrid>
  </MenuStyled>
}
