import { Fragment } from 'react';
import { useRouter } from 'next/router';

// import { getAllEvents } from '../../dummy-data';
import EventList from "../../components/events/event-list";
import EventsSearch from '../../components/events/events-search';

import { getEventById, getAllEvents } from '../../helpers/api-util';



const AllEventsPage = (props) => {
  const router = useRouter();
  // const allEvents = getAllEvents();
  const allEvents = props.events;


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


export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events
    },
    revalidate: 60
  }
}



export default AllEventsPage
