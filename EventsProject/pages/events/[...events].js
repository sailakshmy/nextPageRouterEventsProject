import { useRouter } from "next/router";
import React from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
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
    return (
      <div className="center">
        <ErrorAlert>Invalid filters, please adjust your values</ErrorAlert>
        <Button link="/events">Back To Events page</Button>
      </div>
    );
  }
  const events = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  if (!events || events?.length === 0) {
    return (
      <div className="center">
        <ErrorAlert>No event found for the filter</ErrorAlert>
        <Button link="/events">Back To Events page</Button>
      </div>
    );
  }
  const date = new Date(numYear, numMonth - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={events} />
    </>
  );
};

export default OtherEvents;
