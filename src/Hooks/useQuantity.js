import { useState } from 'react';

export function useQuantity(defaultQuantity) {
  const [value, setValue] = useState(defaultQuantity || 1);

  function onChange(e) {
    // ensure only numbers are accepted (no text etc)
    if(!(+e.target.value >= 1)) {
      setValue(1);
      return;
    }
    // force user input value (if typed) to a number
    setValue(+e.target.value);
  }

  return {
    value,
    setValue,
    onChange
  };
}
