import React from "react";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data";

const Homepage = () => {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <h1>The Home page which will show the Featured events</h1>
      <EventList events={featuredEvents} />
    </div>
  );
};

export default Homepage;
