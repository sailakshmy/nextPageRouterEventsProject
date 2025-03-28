import Image from "next/image";
import React from "react";
import LocationIcon from "../icons/address-icon";
import ArrowRight from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";
import Button from "../ui/button";
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
      <Image src={`/${image}`} alt={title} width={250} height={160} />
      {/* <img src={`/${image}`} alt={title} /> */}
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time dateTime="">{readableDate}</time>
          </div>
          <div className={classes.address}>
            <LocationIcon />
            <address> {formattedAddress}</address>
          </div>
        </div>

        <div className={classes.actions}>
          <Button link={exploreEventLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRight />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
