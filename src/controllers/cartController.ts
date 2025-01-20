import { Request, Response } from "express";
import Cart from "../models/Cart";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const data = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    for (const item of data.items) {
      const isCourseAlreadyInCart = cart.items.some(
        (cartItem) => cartItem.productId.toString() === item.productId
      );

      if (isCourseAlreadyInCart) {
        return res.status(400).json({ message: "Course already in cart" });
      }

      // Add the new item to the cart
      cart.items.push({
        productId: item.productId,
        name: item.name,
        price: item.price,
        thumbnail: item.thumbnail,
        instructor: item.instructor,
        duration: item.duration,
        level: item.level,
      });
    }

    await cart.save();
    res.status(201).json({ message: "Added to cart", cart });
  } catch (error) {
    console.log("Error in addToCart", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get user's cart
export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const cart = await Cart.findOne({ userId });

    // if (!cart) {
    //   return res.status(404).json({ message: "Cart not found" });
    // }

    res.status(200).json(cart);
  } catch (error) {
    console.log("Error in getCart", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { productId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const updatedItems = cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    if (updatedItems.length === cart.items.length) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items = updatedItems;
    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.log("Error in removeFromCart", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Clear cart
export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    await Cart.findOneAndDelete({ userId });

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.log("Error in clearCart", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
