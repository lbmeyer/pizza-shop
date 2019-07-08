import { useState } from "react";

const useToggle = (initialValue) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  return {
    isOpen,
    toggleOpen
  }
}

export default useToggle;