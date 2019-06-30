import React from 'react';
import styled from 'styled-components';
import { FoodLabel } from '../Menu/FoodGrid';

const DialogShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
  transition: all .2s ease-in;

  ${({isOpen}) => `transform: translateX(${isOpen ? "0" : "-100"}%);`}
  
  /* ${({isOpen}) => {
    if(isOpen) {
      return `
      opacity: .7;
      visibility: visible;
      `;
    } else {
      return `
        opacity: 0;
        visibility: hidden;
      `
    }
  }} */
  /* &.fade {
    opacity: .7;
    visibility: visible;
    transition: all 2s ease-in; 
  } */
`;

const Dialog = styled.div`
overflow: scroll;
  width: 500px;
  height: 500px;
  background: white;
  position: fixed;
  top: 75px;
  z-index: 9999999;
  max-height: calc(100% - 100px);
  left: calc(50% - 250px); /* center on page */
  /* transition: all 1s; */
  opacity: 1 !important;
`;



const CloseBtn = styled.div`
  position: absolute;
  right: 30px;
  top: 60px;
  color: white;
  font-weight: 600;
  font-size: 18px;
  z-index: 9999;
  display: block;
  cursor: pointer;
`;

const DialogBanner = styled.div`
  min-height: 200px;
  margin-bottom: 20px;
  ${({ img }) => `background-image: url(${img});`}
  /* ${({ img }) => (img ? `background-image: url(${img});` : `min-height: 75px;`)} */
  background-position: center;
  background-size: cover;
`;

const DialogBannerName = styled(FoodLabel)`
  top: 100px;
  font-size: 30px;
  padding: 5px 40px;
`;

export function FoodDialog({openFood, setOpenFood, isOpen, setIsOpen}) {
  // function close() {
  //   // pass in empty arguments to setOpenFood. openFood will be empty, 
  //   // thereby returning null in if statement below (and not our modal)
  //   setOpenFood();
  // }

  if (!openFood) return null;
  return (
      <DialogShadow isOpen={isOpen} onClick={setIsOpen}>
        <CloseBtn onClick={setIsOpen}>X</CloseBtn>
        <Dialog isOpen={isOpen}>
          <DialogBanner img={openFood.img}>
            <DialogBannerName>{openFood.name}</DialogBannerName>
          </DialogBanner>
        </Dialog>
      </DialogShadow>
  );
}
