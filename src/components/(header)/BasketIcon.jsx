"use client";

import Basket from "./Basket";
import useCartStore from "@/app/store/cartStore";

const BasketIcon = ({ variant = "lime" }) => {
  const { items } = useCartStore();

  return (
    <div className="relative inline-block">
      <Basket variant={variant} />
      {items.length > 0 && <span className="absolute bottom-0 right-0 bg-[#C4FF00] text-black rounded-full text-xs px-2 py-1">{items.reduce((total, item) => total + item.quantity, 0)}</span>}
    </div>
  );
};

export default BasketIcon;
