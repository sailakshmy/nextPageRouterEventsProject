import { useRouter } from "next/router";
import React from "react";
import EventList from "../../components/events/event-list";
import { getFilteredEvents } from "../../dummy-data";

const OtherEvents = () => {
  const router = useRouter();
  const filterData = router.query.events;
  if (!filterData) {
    return <p className="center">Loading...</p>;
  }
  const numYear = +filterData?.[0]; // Transforming string to Number using +;
  const numMonth = +filterData?.[1]; // Transforming string to Number using +;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 13
  ) {
    return <p>Invalid filters, please adjust your values</p>;
  }
  const events = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  if (!events || events?.length === 0) {
    return <p>No event found for the filter</p>;
  }
  return <EventList events={events} />;
};

export default OtherEvents;
