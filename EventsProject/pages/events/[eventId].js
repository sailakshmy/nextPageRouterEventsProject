import { useRouter } from "next/router";
import React from "react";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/ui/error-alert";
import { getEventById } from "../../dummy-data";

const EventsDetailsPage = () => {
  const router = useRouter();
  const eventDetails = getEventById(router.query.eventId);
  if (!eventDetails) {
    return <ErrorAlert>Not Found</ErrorAlert>;
  }
  return (
    <>
      <EventSummary title={eventDetails.title} />
      <EventLogistics
        date={eventDetails.date}
        address={eventDetails.location}
        image={eventDetails.image}
        imageAlt={eventDetails.title}
      />
      <EventContent>
        <p>{eventDetails.description}</p>
      </EventContent>
    </>
  );
};

export default EventsDetailsPage;
