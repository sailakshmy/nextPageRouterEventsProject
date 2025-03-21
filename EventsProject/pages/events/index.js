import { useRouter } from "next/router";
import React from "react";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getAllEvents } from "../../helpers/api-utils";

const EventsPage = ({ events }) => {
  const router = useRouter();
  const onSearch = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <div>
      <EventSearch onSearch={onSearch} />
      <EventList events={events} />
    </div>
  );
};

export default EventsPage;

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}
