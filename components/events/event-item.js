// import Link from 'next/link';
import Image from 'next/image';

import Button from '../ui/button';
import moment from 'moment';

// import styles from './event-item.module.css';
import classes from './event-item.module.css';

import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';


const EventItem = ({ event }) => {
  const { title, image, date, location, id } = event;

  // const formattedDate = new Date(date).toLocaleDateString('en-US', {
  //   day: 'numeric',
  //   month: 'long',
  //   year: 'numeric'
  // });

  const MomentDate = moment(date).format('MMMM Do YYYY');

  const formattedAddress = location.replace(', ', '\n');

  const exploreLink = `/events/${id}`


  return (
    <li className={classes.item}>
      <Image src={'/' + image} alt={title} width={250} height={160}/>
      {/* <img src={'/' + image} alt={title} /> */}
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{MomentDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon  />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          {/* <Link href={exploreLink}>Explore Event</Link> */}
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}><ArrowRightIcon /></span>
          </Button>
        </div>
      </div>
    </li>
  )
}

export default EventItem
