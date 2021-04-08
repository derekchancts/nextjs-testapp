import { useEffect, useState } from 'react'
import useSWR from 'swr';

import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data"


const HomePage = (props) => {
  // const featuredEvents = getFeaturedEvents();
  const [events, setEvents] = useState(props.events)
  
  const { data, error } = useSWR('https://nextjs-course-15d9e-default-rtdb.firebaseio.com/events.json');


  useEffect(() => {
    if (data) {
      const transformedEvents = [];   // transform the object to an array
  
      for (const key in data) {
        if (data[key].isFeatured) {
          transformedEvents.push({
            id: key,
            // title: data[key].title,
            // description: data[key].description,
            // location: data[key].location,
            // date: data[key].date,
            // image: data[key].image
            ...data[key]
          });
        }
      };
      setEvents(transformedEvents);
    };
  }, [data]);


  if (error) {
    return <p>Failed to load.</p>
  };

  if (!data && !events) {
    return <p>Loading...</p>
  };



  return (
    <div>
      <ul>
        {/* <EventList events={featuredEvents} /> */}

        {/* {
          featuredEvents.map(event => {
            return (
              <li key={event.id}>
                <EventList event={event} />
              </li>
            )
          })
        } */}

      <EventList events={events} />

      </ul>
    </div>
  )
};



export const getStaticProps = async () => {

  const response = await fetch('https://nextjs-course-15d9e-default-rtdb.firebaseio.com/events.json');
  const data = await response.json();

  const transformedEvents = [];

  for (const key in data) {
    if (data[key].isFeatured) {
      transformedEvents.push({
        id: key,
        // title: data[key].title,
        // description: data[key].description,
        // location: data[key].location,
        // date: data[key].date,
        // image: data[key].image
        ...data[key]
      })
    }
  }

  return {
    props: {
      events: transformedEvents
    }
  }

}




export default HomePage
