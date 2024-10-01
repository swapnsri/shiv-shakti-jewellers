import { useEffect, useState } from "react";
import { saveStateSession } from "../utils";

type Props = {
  onHamburgerClick: (isOpen: boolean) => void;
  hamIconClicked: boolean;
};

const HamburgerIcon = ({ onHamburgerClick, hamIconClicked }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    const newState = !isOpen;
    onHamburgerClick(newState);
    setIsOpen(newState);
  };
  useEffect(() => {
    if (hamIconClicked === false) {
      setIsOpen(false);
    }
  }, [hamIconClicked]);

  return (
    <div
      id="ss-radha-hamburger-icon"
      className="relative w-8 h-[1.28rem] flex flex-col justify-between items-center cursor-pointer"
      onClick={toggleMenu}
    >
      <span
        className={`block w-full h-1 bg-gray-800 rounded transition-transform duration-300 ease-in-out ${
          isOpen ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`block w-full h-1 bg-gray-800 rounded transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block w-full h-1 bg-gray-800 rounded transition-transform duration-300 ease-in-out ${
          isOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </div>
  );
};

export default HamburgerIcon;
