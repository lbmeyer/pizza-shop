import React from 'react';
import styled from 'styled-components';
import { foods, formatPrice } from '../Data/FoodData';
import { Food, FoodGrid, FoodLabel } from './FoodGrid';
import { pizzaRed } from '../Styles/colors';

// import { foods } from "../Data/FoodData";
// import { Food, FoodGrid, FoodLabel } from "./FoodGrid";
// import { formatPrice } from "../Data/FoodData";

const MenuStyled = styled.div`
  height: 1000px;
  margin: 0px 400px 50px 20px;
`;

const FoodPrice = styled.div`
  font-size: 14px;
  color: ${pizzaRed}
  margin-top: 5px;
`;

export function Menu({ setOpenFood }) {
  // console.log(foods);
  return (
    <MenuStyled>
      {/* in our map, destructure out our key (section name) and the value (food array)  */}
      {Object.entries(foods).map(([sectionName, foods]) => (
        <>
          <h1>{sectionName}</h1>
          <FoodGrid>
            {foods.map(food => (
              <Food
                img={food.img}
                onClick={() => {
                  setOpenFood(food);
                }}
              >
                <FoodLabel>
                  <div>{food.name}</div>
                  <FoodPrice>{formatPrice(food.price)}</FoodPrice>
                </FoodLabel>
              </Food>
            ))}
          </FoodGrid>
        </>
      ))}
    </MenuStyled>
  );
}
