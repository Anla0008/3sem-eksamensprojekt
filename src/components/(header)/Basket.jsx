import { HiOutlineShoppingBag } from "react-icons/hi";

const Basket = ({ variant = "lime" }) => {
  const isLime = variant === "lime";

  return <HiOutlineShoppingBag size={50} className={`cursor-pointer ${isLime ? "text-[#C4FF00]" : "text-black"}`} />;
};

export default Basket;
