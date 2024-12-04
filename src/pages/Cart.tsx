import { useCart } from "@/contexts/CartContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import CartRow from "@/components/custom/CartRow";

const Cart = () => {
  const cart = useCart();

  return (
    <main className="w-full flex flex-col md:flex-row gap-6 md:min-h-[80vh] md:pt-[100px]">
      <div className="w-full md:w-3/5">
        <Table>
          <TableCaption>A list of your products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Id</TableHead>
              <TableHead className="hidden md:block">Products</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Sub total</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.cart.map((product) => (
              <CartRow key={product.id} {...product}></CartRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="w-full flex flex-col gap-6 md:w-2/5">
        <h2 className="font-bold text-xl">Cart totals</h2>
        <Table>
          <TableCaption>Total Price</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell>
                {cart.cart.reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Taxes and Shipping are calculated at Checkout.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>
                {cart.cart.reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button className="w-full">Proceed to checkout</Button>
      </div>
    </main>
  );
};

export default Cart;
