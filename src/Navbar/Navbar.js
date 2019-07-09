import React from 'react';
import styled from 'styled-components';
import { pizzaRed } from '../Styles/colors';
import { Title } from '../Styles/title';

const NavbarContainer = styled.div`
  background-color: ${pizzaRed};
  padding: 15px 0;
  position: fixed;
  /* margin: 0 auto; */
  width: 100%;
  z-index: 999;
`;

const NavInner = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Title)`
  font-size: 24px;
  color: white;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.4s;

  &:after {
    display: block;
    content: '';
    border-bottom: dotted 2px #fff;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
    transform-origin: 0% 50%;

    ${({ isOpen }) =>
      isOpen &&
      `
      transform: scaleX(1);
    `}
  }
`;

const NavbarMenu = styled.div`
  display: flex;
  align-items: center;
`;

const CartIcon = styled.svg`
  width: 32px;
  /* height: 38px; */
  fill: white;
  cursor: pointer;
`;

const ShoppingCart = styled.div`
  position: relative;
`;

const CartCount = styled.div`
  position: absolute;
  color: white;
  font-size: 12px;
  top: 13px;
  left: ${({ orderQty }) => (orderQty >= 10 ? '9px' : '13px')};
  cursor: pointer;
`;

const UserStatus = styled.div`
  color: white;
  font-size: 14px;
  margin-right: 30px;
`;

const LoginButton = styled.span`
  cursor: pointer;
`;

const LogoutButton = styled.span`
  cursor: pointer;
  padding: 5px;
  border: 1px solid white;
  /* background: white; */
  color: white;
  display: inline-block;
  margin-left: 20px;
  font-size: 14px;
  transition: all .3s ease;

  &:hover {
    background: white;
    color: ${pizzaRed};
  }
`;

export function Navbar({ isOpen, toggleOpen, orderQty, login, logout, loggedIn }) {
  return (
    <NavbarContainer>
      <NavInner>
        <Logo isOpen={isOpen}>
          Mama's Pizzeria{' '}
          <span role="img" aria-label="pizza slice">
            🍕
          </span>
        </Logo>
        <NavbarMenu>
          <UserStatus>
            {loggedIn !== "loading" ? (
              <>
                {loggedIn ? `Welcome, ${loggedIn.displayName}` : ""}
                {loggedIn ? (
                  <LogoutButton onClick={logout}> Logout </LogoutButton>
                ) : (
                  <LoginButton onClick={login}> Login / Signup </LoginButton>
                )}
              </>
            ) : (
              "loading..."
            )}
          </UserStatus>
          <ShoppingCart onClick={toggleOpen}>
            <CartCount orderQty={orderQty}>{orderQty}</CartCount>
            <CartIcon viewBox="0 0 24 24">
              <path d="M16 6v-2c0-2.209-1.791-4-4-4s-4 1.791-4 4v2h-5v18h18v-18h-5zm-7-2c0-1.654 1.346-3 3-3s3 1.346 3 3v2h-6v-2zm10 18h-14v-14h3v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h3v14z" />
            </CartIcon>
          </ShoppingCart>
        </NavbarMenu>
      </NavInner>
    </NavbarContainer>
  );
}
