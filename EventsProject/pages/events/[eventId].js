import Head from "next/head";
import React from "react";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import Comments from "../../components/input/comments";
import ErrorAlert from "../../components/ui/error-alert";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";

const EventsDetailsPage = ({ event: eventDetails }) => {
  if (!eventDetails) {
    return (
      <ErrorAlert>
        <div className="center">Not Found</div>
      </ErrorAlert>
    );
  }
  return (
    <>
      <Head>
        <title>{eventDetails?.title}</title>
        <meta content={eventDetails?.description} name="description" />
      </Head>
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
      <Comments eventId={eventDetails?.id} />
    </>
  );
};

export default EventsDetailsPage;

export async function getStaticProps(context) {
  const { eventId } = context.params;
  const event = await getEventById(eventId);
  return {
    props: {
      event: event ?? null,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events?.map((event) => ({ params: { eventId: event?.id } }));
  return {
    paths,
    fallback: "blocking",
  };
}
