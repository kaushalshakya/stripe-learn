import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Checkout from "./Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Plans = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  const { data, error, isLoading } = useQuery({
    queryKey: ["getPlans"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8080/api/v1/plans");
      return response.data;
    },
  });

  const subscriptionMutation = async (stripe_plan_id) => {
    const response = await axios.post(
      "http://localhost:8080/api/v1/subscriptions",
      { stripe_plan_id }
    );

    return response.data;
  };

  const mutation = useMutation({
    mutationFn: subscriptionMutation,
    onSuccess: (data) => {
      console.log(data);
      setClientSecret(data.clientSecret);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const handleSubscribe = (plan) => {
    console.log(plan);
    mutation.mutate(plan.stripe_plan_id);
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col items-center gap-2 pb-10">
      <h1 className="font-bold text-lg">Plans</h1>
      {data.map((plan) => (
        <div className="flex flex-col items-center gap-2" key={plan._id}>
          <h1>{plan.plan_name}</h1>
          <h1>{plan.price}</h1>
          <button
            type="button"
            className="px-3 bg-black text-white"
            onClick={() => handleSubscribe(plan)}
          >
            Subscribe
          </button>
        </div>
      ))}
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Checkout return_url={"plans"} />
        </Elements>
      )}
    </div>
  );
};

export default Plans;
