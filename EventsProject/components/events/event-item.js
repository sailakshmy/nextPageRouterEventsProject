import Link from "next/link";
import React from "react";

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
    <li>
      {/* <img src={`/${image}`} alt={title} /> */}
      <div>
        <h2>{title}</h2>
        <div>
          <time datetime="">{readableDate}</time>
        </div>
        <div>
          <address> {formattedAddress}</address>
        </div>
      </div>
      <div>
        <Link href={exploreEventLink}>Explore Event</Link>
      </div>
    </li>
  );
};

export default EventItem;
