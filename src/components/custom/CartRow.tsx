import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { CartItem } from "@/contexts/CartContext";
import { useCart } from "@/contexts/CartContext";

const CartRow: React.FC<CartItem> = ({ id, name, price, quantity }) => {
  const [qty, setQty] = useState<number>(quantity);
  const cart = useCart();

  const increaseQty = () => {
    setQty(qty + 1);
  };

  const reduceQty = () => {
    if (quantity > 0) {
      setQty(qty - 1);
    }
  };

  useEffect(() => {
    cart.updateQuantity(id, qty);
  }, [qty]);

  return (
    <TableRow>
      <TableCell className="w-[50px]">{id}</TableCell>
      <TableCell className="hidden md:block">{name}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant={"secondary"} onClick={reduceQty}>
            -
          </Button>
          <span>{qty}</span>
          <Button variant={"secondary"} onClick={increaseQty}>
            +
          </Button>
        </div>
      </TableCell>
      <TableCell>{price * qty}</TableCell>
      <TableCell>
        <Button
          className="hidden md:block"
          onClick={() => cart.removeFromCart(id)}
        >
          Remove Item
        </Button>
        <Button className="md:hidden" onClick={() => cart.removeFromCart(id)}>
          -
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartRow;
