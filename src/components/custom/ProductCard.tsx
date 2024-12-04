import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "../ui/button";

type ProductCardProp = {
  id: number;
  image: string;
  imgalt: string;
  title: string;
  price: number;
  description: string;
};

const ProductCard: React.FC<ProductCardProp> = ({
  id,
  image,
  imgalt,
  title,
  price,
  description,
}) => {
  const [quantity, setQuantity] = useState<number>(0);

  const increaseQty = () => {
    setQuantity(quantity + 1);
  };

  const reduceQty = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const cart = useCart();

  const handleAddToCart = () => {
    if (quantity > 0) {
      cart?.addToCart({
        id,
        name: title,
        price,
        quantity,
      });
    }
  };

  return (
    <Card className="max-w-[300px] xl:max-w-[350px] w-full">
      <CardHeader className="p-0">
        <img
          className="w-full h-[300px] md:h-[350px] object-cover object-center"
          src={image}
          alt={imgalt}
        />
      </CardHeader>
      <CardContent className="pt-2 flex flex-col gap-1">
        <CardTitle className="uppercase">{title}</CardTitle>
        <p>$ {`${price}.00`}</p>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant={"secondary"} onClick={reduceQty}>
            -
          </Button>
          <span>{quantity}</span>
          <Button variant={"secondary"} onClick={increaseQty}>
            +
          </Button>
        </div>
        <Button className="" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
