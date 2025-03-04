import { useRouter } from "next/router";
import React from "react";

const EventsDetailsPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>This is the events Details page for {router.query.eventId}</h1>
    </div>
  );
};

export default EventsDetailsPage;
