import Head from "next/head";
import React from "react";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";
const Homepage = ({ featuredEvents }) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta content="Find events around you!" name="description" />
      </Head>
      <EventList events={featuredEvents} />
    </div>
  );
};

export default Homepage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}
