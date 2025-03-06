import React from "react";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getAllEvents } from "../../dummy-data";

const EventsPage = () => {
  const events = getAllEvents();
  return (
    <div>
      <EventSearch />
      <EventList events={events} />
    </div>
  );
};

export default EventsPage;
