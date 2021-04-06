import { useRouter } from 'next/router';
import { Fragment } from 'react';

import EventSummary from '../../../components/event-detail/event-summary';
import EventLogistics from '../../../components/event-detail/event-logistics';
import EventContent from '../../../components/event-detail/event-content';

// import { getEventById } from '../../../dummy-data';
import { getEventById, getAllEvents, getFeaturedEvents } from '../../../helpers/api-util';



// const EventDetailPage = async (props) => {
const EventDetailPage = (props) => {

  // const router = useRouter();
  // console.log(router.query.eventId)
  // const { eventId } = router.query;
  // const selectedEvent = await getEventById(eventId);
  const selectedEvent = props.selectedEvent;

  if (!selectedEvent) {
    return (
      <div className="center">
        <p>No Event Found</p>
      </div>
    )
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
     <EventContent>
       <p>{selectedEvent.description}</p>
     </EventContent>
   </Fragment>
  )
}



export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;
  const selectedEvent = await getEventById(eventId);

  return {
    props: {
      selectedEvent
    }
  }
}


export const getStaticPaths = async () => {
  // const events = await getAllEvents();
  const events = await getFeaturedEvents();

  const paths = events.map(event => ({
    params: {
      eventId: event.id
    }
  })) 

  return {
    // paths: 
    // [
    //   { params: { eventId: 'e1' } }
    // ]
    paths,
    // fallback: false  // we have included "ALL" paths/ids. If we try to go to an unknown page, then it will be redirected to 404 page.
    fallback: true  // telling NextJS that there are more pages (in case if it cannot find it). It will then dynamically try to 
                    // generate the page if it cannot be found
    // fallback: 'blocking'  // meaning that Nextjs will wait until the page is fully generated. 
  };
} 



export default EventDetailPage
