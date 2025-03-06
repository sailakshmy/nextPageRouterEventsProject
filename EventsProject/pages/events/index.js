import React from "react";
import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../dummy-data";

const EventsPage = () => {
  const events = getAllEvents();
  return (
    <div>
      <EventList events={events} />
    </div>
  );
};

export default EventsPage;
