import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../dummy-data';
import EventList from "../../components/events/event-list";
import EventsSearch from '../../components/events/events-search';



const AllEventsPage = () => {
  const router = useRouter();
  const allEvents = getAllEvents();


  const findEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }


  return (
    <Fragment>
      <ul>
        <EventsSearch onSearch={findEventHandler}/>
        <EventList events={allEvents} />
      </ul>
    </Fragment>
  )
}

export default AllEventsPage
