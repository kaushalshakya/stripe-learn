import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";

const Products = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const [clientSecret, setClientSecret] = useState(null);
  const [amount, setAmount] = useState(null);
  const [intent, setIntent] = useState(null);

  const { error, isLoading, data } = useQuery({
    queryKey: ["getProducts"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8080/api/v1/products");
      return response.data;
    },
  });

  const createPaymentMutation = async (data) => {
    const response = await axios.post("http://localhost:8080/api/v1/payment", {
      product_id: data._id,
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: createPaymentMutation,
    onSuccess: (data) => {
      console.log(data);
      setClientSecret(data.clientSecret);
      setAmount(data.amount);
      setIntent(data.payment_intent);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleClick = (data) => {
    mutation.mutate(data);
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col items-center w-full h-full py-16">
      <h1 className="font-bold text-lg">Products</h1>
      <div className="flex flex-col gap-7 mt-7">
        {data.products.map((product) => (
          <div className="flex flex-col gap-2 items-center" key={product._id}>
            <h1>{product.product_name}</h1>
            <h1>{product.product_price}</h1>
            <button
              type="button"
              className="rounded-sm bg-black text-white px-5"
              onClick={() => handleClick(product)}
            >
              Buy
            </button>
          </div>
        ))}
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <Checkout intent={intent} amount={amount} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Products;
