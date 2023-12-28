import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const Subscriptions = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getSubscriptions"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:8080/api/v1/subscriptions"
      );
      return response.data;
    },
  });

  const cancelSubscription = async (sub_id) => {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/subscriptions/${sub_id}`
    );
    return response.data;
  };

  const cancelMutation = useMutation({
    mutationFn: cancelSubscription,
    onSuccess: (data) => {
      console.log(data);
      alert("Subscription cancelled");
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  if (error) {
    return console.log(error.message);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleCancel = (sub) => {
    console.log(sub);
    cancelMutation.mutate(sub.id);
  };

  return (
    <>
      <div className="space-y-5">
        <h1>Subscriptions</h1>
        {data.data.map((sub) => (
          <div key={sub.id}>
            <p>-----------------------------------</p>
            <p>id: {sub.id}</p>
            <p>collection method: {sub.collection_method}</p>
            <p>customer: {sub.customer}</p>
            <p>invoice: {sub.latest_invoice}</p>
            <p>default payment method: {sub.default_payment_method}</p>
            <p>object: {sub.object}</p>
            <button
              type="button"
              onClick={() => handleCancel(sub)}
              className="bg-black text-white px-5 py-2"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Subscriptions;
