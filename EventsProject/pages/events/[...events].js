import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const OtherEvents = () => {
  const router = useRouter();
  const filterData = router.query.events;
  const [loadedEvents, setLoadedEvents] = useState();

  const { data, error } = useSWR(
    "https://nextjs-dummyproject-37a39-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    console.log("Data", data);
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Events</title>
      <meta
        content={`A list of events for a specific period`}
        name="description"
      />
    </Head>
  );
  if (!loadedEvents) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  const numYear = +filterData?.[0]; // Transforming string to Number using +;
  const numMonth = +filterData?.[1]; // Transforming string to Number using +;

  pageHeadData = (
    <Head>
      <title>Events</title>
      <meta
        content={`All events for ${numMonth}/${numYear}`}
        name="description"
      />
    </Head>
  );

  // if (hasError) {
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 13 ||
    error
  ) {
    return (
      <div className="center">
        {pageHeadData}
        <ErrorAlert>Invalid filters, please adjust your values</ErrorAlert>
        <Button link="/events">Back To Events page</Button>
      </div>
    );
  }
  // const events = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // });

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents?.length === 0) {
    return (
      <div className="center">
        {pageHeadData}
        <ErrorAlert>No event found for the filter</ErrorAlert>
        <Button link="/events">Back To Events page</Button>
      </div>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList events={loadedEvents} />
    </>
  );
};

export default OtherEvents;

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.events;
//   const numYear = +filterData?.[0]; // Transforming string to Number using +;
//   const numMonth = +filterData?.[1]; // Transforming string to Number using +;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 13
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }
//   const events = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: events,
//       eventDate: {
//         numYear,
//         numMonth,
//       },
//     },
//   };
// }
