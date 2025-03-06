import React from "react";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data";

const Homepage = () => {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
};

export default Homepage;
