import React, {Fragment} from 'react';
import styled from 'styled-components';

const CursorPointer = `cursor: pointer`;

const RadioInput = styled.input`
  ${CursorPointer}
  &:not(:first-of-type) {
    margin-left: 20px;
  }
`;

const Label = styled.label`
  ${CursorPointer}
`;

export function Choices({openFood, choiceRadio}) {
  return (
    <>
      <h3>Choose One</h3>
      {openFood.choices.map((choice, index) => (
        <Fragment key={index}>
          <RadioInput
            type="radio"
            id={choice}
            name="choice"
            value={choice}
            checked={choiceRadio.value === choice}
            onChange={choiceRadio.onChange}
          />
          <Label htmlFor={choice}> {choice}{" "} </Label>{" "}
        </Fragment>
      ))}
    </>
  )
}