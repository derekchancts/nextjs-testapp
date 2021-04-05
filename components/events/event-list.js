import EventItem from "./event-item";
import classes from './event-list.module.css';


const EventList = ({ events }) => {
  return (
    <ul className={classes.list}>
      {
        events.map(event => (
          <EventItem event={event} key={event.id} />
        ))
      }
    </ul>
  )
}

export default EventList
