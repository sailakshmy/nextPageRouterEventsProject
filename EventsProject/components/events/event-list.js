import EventItem from "./event-item";
import classes from "./event-list.module.css";

function EventList(props) {
  const { events } = props;
  return (
    <ul className={classes.list}>
      {events?.map((event) => (
        <EventItem event={event} key={event?.id} />
      ))}
    </ul>
  );
}

export default EventList;
