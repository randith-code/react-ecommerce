import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import CartIcon from "../icons/cartIcon";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const cart = useCart();
  const user = useAuth();

  const handleLogout = () => {
    navigate("/login");
    user.logout();
  };

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment.length > 0);

  return (
    <nav className="flex items-center justify-center py-6">
      <div className="flex items-center justify-between w-[90%] xl:max-w-[1140px] xl:w-full">
        <section>
          <p className="font-semibold text-black text-xl">E-commerce</p>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              {pathSegments.map((segment, index) => {
                const routeTo = `/${pathSegments
                  .slice(0, index + 1)
                  .join("/")}`;

                const segmentName =
                  segment.charAt(0).toUpperCase() + segment.slice(1);

                return (
                  <React.Fragment key={routeTo}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href={routeTo}>
                        {segmentName}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </section>

        <section className="flex items-center gap-4">
          <span className="relative p-2 bg-slate-100 rounded-full aspect-square hover:bg-slate-300 cursor-pointer">
            <Link to={"/cart"}>
              <CartIcon />
            </Link>
            <p className="absolute top-0 right-0 font-bold">
              {cart?.cart.length}
            </p>
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{user.user?.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </div>
    </nav>
  );
};

export default NavBar;
