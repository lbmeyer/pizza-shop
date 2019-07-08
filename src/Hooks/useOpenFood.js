import { useState } from 'react';

export function useOpenFood() {
  const [openFood, setOpenFood] = useState();

  console.log('openFood', openFood);
  

  return {
    openFood,
    setOpenFood
  }
}