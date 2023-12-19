import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const Checkout = ({ intent, amount }) => {
  const elements = useElements();
  const stripe = useStripe();

  const createSubscriptionMutation = async (token) => {
    const response = await axios.post(
      "http://localhost:8080/api/v1/subscriptions",
      token
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: createSubscriptionMutation,
    onSuccess: (data) => {
      console.log(data);
      alert("Subscription successful");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handlePayment = async () => {
    if (!elements || !stripe) {
      return;
    }

    // const paymentMethod = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardElement),
    //   billing_details: {
    //     name: "Kaushal Shakya",
    //   },
    // });

    // if (paymentMethod.error) {
    //   console.log(paymentMethod.error.message);
    // } else {
    //   console.log("Payment method created succeeded");
    // }

    // const result = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     return_url: "http://localhost:5173",
    //   },
    // });

    // if (result.error) {
    //   console.log(result.error.message);
    // } else {
    //   console.log("Payment created succeeded");
    // }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.log(error.message);
    }

    mutation.mutate(token);
  };
  return (
    <div className="flex flex-col gap-5 items-center">
      <CardElement className="bg-white text-black rounded-md w-[15rem]" />
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
