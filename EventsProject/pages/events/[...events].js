import { useRouter } from "next/router";
import React from "react";

const OtherEvents = () => {
  const router = useRouter();
  console.log("roueter", router.query);
  return (
    <div>
      <h1>This is the filtered events page</h1>
    </div>
  );
};

export default OtherEvents;
