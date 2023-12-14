import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const Checkout = ({ intent, amount }) => {
  const elements = useElements();
  const stripe = useStripe();

  const handlePayment = async () => {
    if (!elements || !stripe) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173",
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log("Payment succeeded");
    }
  };
  return (
    <div className="flex flex-col gap-5 items-center">
      <PaymentElement />
      <button
        type="button"
        className="rounded-sm bg-black text-white px-5"
        disabled={!stripe}
        onClick={handlePayment}
      >
        Pay
      </button>
    </div>
  );
};

export default Checkout;
