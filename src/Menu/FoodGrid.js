import styled from "styled-components";
import { Title } from "../Styles/title";

export const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  }
`;


export const FoodLabel = styled(Title)`
  font-family: 'Lato', sans-serif;
  position: absolute; /* or use display: inline-block */
  bottom: 0px;
  left: 0px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  font-size: 18px;
`;

export const Food = styled.div`
  height: 200px;
  width: 100%;
  font-size: 20px; 
  background-image: ${({img}) => `url(${img});` } ;
  background-position: center;
  background-size: cover;
  filter: contrast(80%);
  &:hover {
    cursor: pointer; 
    filter: contrast(100%); 
  }
`;