import Link from "next/link";
import React from "react";
import classes from "./event-item.module.css";

const EventItem = (props) => {
  const { title, location, date, id, image } = props.event;
  const readableDate = new Date(date).toLocaleDateString("en-US", {
    date: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");
  const exploreEventLink = `/events/${id}`;
  return (
    <li className={classes.item}>
      <img src={`/${image}`} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time datetime="">{readableDate}</time>
          </div>
          <div className={classes.address}>
            <address> {formattedAddress}</address>
          </div>
        </div>

        <div className={classes.actions}>
          <Link href={exploreEventLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
