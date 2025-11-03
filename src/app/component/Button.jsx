import { FaArrowCircleRight } from "react-icons/fa";

function Button({ onHandleClick, text, classAdd, icon }) {
  return (
    <button
      className={`mt-4 flex items-center justify-center gap-2 rounded-full bg-black p-2 text-sm text-white transition-all duration-300 hover:translate-y-1 hover:scale-x-105 hover:bg-white hover:text-black md:gap-2 ${classAdd} `}
      onClick={onHandleClick}
    >
      {text}
      <span>{icon ? icon : <FaArrowCircleRight />}</span>
    </button>
  );
}
export default Button;
