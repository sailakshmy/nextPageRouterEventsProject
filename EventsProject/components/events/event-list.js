import EventItem from "./event-item";

function EventList(props) {
  const { events } = props;
  return (
    <ul>
      {events?.map((event) => (
        <EventItem event={event} key={event?.id} />
      ))}
    </ul>
  );
}

export default EventList;
