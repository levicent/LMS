import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/cartContext";
import { useEnrollCourse } from "./useEnrollCourse";
import { toast } from "react-toastify";
import api from "@/services/api";

export const useCheckout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const { enrollCourse } = useEnrollCourse();

  const handleCheckout = async ({ name, description }: any) => {
    try {
      const orderResponse = await api.post("/payment/create-order", {
        amount: cart.reduce((total, item) => total + item.price, 0),
        currency: "INR",
        receipt: "order_rcptid_11",
      });

      if (!orderResponse.data.id) {
        toast.error("Failed to create order. Please try again.");
        return;
      }

      const { id: orderId, amount, currency } = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency: currency,
        name: name,
        description: description,
        order_id: orderId,
        handler: async (response: any) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          const verifyResponse = await api.post("/payment/verify-payment", {
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id,
            razorpay_signature: razorpay_signature,
          });

          if (verifyResponse.data.message === "Payment successful") {
            for (const item of cart) {
              await enrollCourse(item.productId);
            }
            toast.success("Courses enrolled successfully");
            clearCart();
            navigate("/my-courses");
          } else {
            toast.error("Payment verification failed. Please try again later.");
          }
        },
        theme: { color: "#3399cc" },
      };

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };
      script.onerror = () => {
        toast.error("Failed to load Razorpay SDK. Please try again later.");
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error("Enrollment failed:", error);
      toast.error("Enrollment failed. Please try again later.");
    }
  };

  return { handleCheckout };
};
