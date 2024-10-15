import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, ShoppingCart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import DefaultLayout from "@/layout/DefaultLayout";
import { useCart } from "@/context/cartContext";

export default function Component() {
  const { cart, removeFromCart } = useCart();
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  useEffect(() => {
    console.log("Cart", cart);
  }, []);

  return (
    <DefaultLayout>
      <main className="dark:bg-gray-900 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl dark:bg-gray-800">
          <Card className="border-none shadow-lg dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center gap-2">
                <ShoppingCart className="w-8 h-8" />
                Shopping Cart
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-xl text-gray-500 dark:text-gray-400">
                    Your cart is empty
                  </p>
                  <Link to="/">
                    <Button className="mt-4" variant="outline">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              ) : (
                <ScrollArea className="h-[400px] pr-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 py-4 group"
                      onMouseEnter={() => setIsHovered(item.id)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <div className="relative w-34 h-32 rounded-md overflow-hidden">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h2 className="font-semibold text-lg dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {item.name}
                          </h2>
                          <button
                            className={`text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-opacity duration-300 ${
                              isHovered === item.id
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            <X size={30} />
                          </button>
                        </div>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                          By {item.instructor.firstName}{" "}
                          {item.instructor.lastName}
                        </div>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">
                          Rs {item.price.toFixed(2)}
                        </p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <p>{item.duration} hours</p>
                          <p>{item.level}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              )}
            </CardContent>
            {cart.length > 0 && (
              <CardFooter className="flex flex-col">
                <Separator className="mb-4" />
                <div className="w-full flex justify-between items-center mb-4">
                  <div>
                    <p className="text-lg font-semibold dark:text-white">
                      Order Summary
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    Rs {totalPrice.toFixed(2)}
                  </p>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                  Proceed to Checkout <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </main>
    </DefaultLayout>
  );
}
