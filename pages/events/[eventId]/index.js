import { useRouter } from 'next/router';
import { Fragment } from 'react';

import EventSummary from '../../../components/event-detail/event-summary';
import EventLogistics from '../../../components/event-detail/event-logistics';
import EventContent from '../../../components/event-detail/event-content';

import { getEventById } from '../../../dummy-data';



const EventDetailPage = () => {
  const router = useRouter();
  // console.log(router.query)
  const { eventId } = router.query;
  const selectedEvent = getEventById(eventId);

  if (!selectedEvent) {
    return <p>No Event Found</p>
  }


  // Fragment here allows you to include json element in JSX

  return (
   <Fragment>
     <EventSummary title={selectedEvent.title} />
     <EventLogistics  
      date={selectedEvent.date}
      location={selectedEvent.location}
      image={selectedEvent.image}
      imageAlt={selectedEvent.title}
    />
    {/* <EventLogistics selectedEvent={selectedEvent} imageAlt={selectedEvent.title} /> */}
     <EventContent>
       <p>{selectedEvent.description}</p>
     </EventContent>
   </Fragment>
  )
}

export default EventDetailPage
