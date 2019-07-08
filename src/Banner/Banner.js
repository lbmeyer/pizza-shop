import React from 'react';
import styled from 'styled-components';

const BannerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 70px;
  height: 300px;
  /* background-image: url("img/banner.jpeg"); */
  background-image: linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.62)),
    url('img/pizza-hero.jpg');
  background-position: center 90%;
  background-size: cover;
  /* filter: contrast(80%); */
`;

const BannerText = styled.div`
  font-size: 48px;
  color: white;
  border-top: 3px white solid;
  border-bottom: 3px white solid;
`;

export function Banner() {
  return (
    <BannerContainer>
      <BannerText>Mama's Pizzeria</BannerText>
    </BannerContainer>
  );
}
