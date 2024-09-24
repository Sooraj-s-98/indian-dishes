import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchDish from "./SearchDish";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Dish Suggester", path: "/dishes/suggester" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <MountainIcon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Sooraj</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchDish />
          </div>
          <nav className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-2 hidden md:flex">
              Sign in
            </Button>
            <Button size="sm" className="hidden md:flex">Sign up</Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white text-black pr-0">
              <SheetTitle>Navigation Menu</SheetTitle>
                
                <MobileNav items={menuItems} />
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  );
}

function MobileNav({ items }) {
  return (
    <div className="flex flex-col space-y-3 text-foreground">
      {items.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="text-foreground/60 transition-colors hover:text-foreground"
        >
          {item.name}
        </Link>
      ))}
      <Button variant="outline" className="justify-start">Sign in</Button>
      <Button className="justify-start">Sign up</Button>
    </div>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
