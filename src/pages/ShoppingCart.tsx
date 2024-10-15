import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, ShoppingCart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRemoveFromCart } from "@/hooks/useRemoveFromCart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DefaultLayout from "@/layout/DefaultLayout";
import { useCart } from "@/context/cartContext";

export default function Component() {
  const { cart } = useCart();
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
  const removeFromCartMutation = useRemoveFromCart();

  const handleRemoveFromCart = (id: string) => {
    setItemToRemove(id);
    setDialogOpen(true);
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      removeFromCartMutation.mutate(itemToRemove);
      setDialogOpen(false);
      setItemToRemove(null);
    }
  };

  return (
    <DefaultLayout>
      <main className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border border-gray-300 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="text-2xl font-semibold flex items-center gap-3 text-gray-900 dark:text-gray-100">
                <ShoppingCart className="w-6 h-6" />
                Shopping Cart
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                    Your cart is empty
                  </p>
                  <Link to="/">
                    <Button
                      variant="outline"
                      size="lg"
                      className="font-medium text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              ) : (
                <ScrollArea className="h-[400px] pr-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-6 py-6 group border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                      onMouseEnter={() => setIsHovered(item.id)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <div className="relative w-32 h-24 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h2 className="font-medium text-lg text-gray-900 dark:text-gray-100">
                            {item.name}
                          </h2>
                          <button
                            onClick={() =>
                              handleRemoveFromCart(item.productId._id)
                            }
                            className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-opacity duration-300 ${
                              isHovered === item.id
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            <X size={20} />
                          </button>
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-400 mt-1">
                          By {item.instructor.firstName}{" "}
                          {item.instructor.lastName}
                        </div>
                        <p className="text-gray-900 dark:text-gray-100 font-medium mt-2">
                          Rs {item.price.toFixed(2)}
                        </p>
                        <div className="flex gap-4 mt-2 text-xs text-gray-600 dark:text-gray-500">
                          <span>{item.duration} hours</span>
                          <span>{item.level}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              )}
            </CardContent>
            {cart.length > 0 && (
              <CardFooter className="flex flex-col bg-gray-50 dark:bg-gray-800 p-6">
                <Separator className="mb-6" />
                <div className="w-full flex justify-between items-center mb-6">
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Order Summary
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Rs {totalPrice.toFixed(2)}
                  </p>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Proceed to Checkout <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </main>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">
              Remove Course
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Are you sure you want to remove this course from your cart?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmRemove}
              className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-600"
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DefaultLayout>
  );
}
