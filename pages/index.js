import { useEffect, useState } from 'react'
import useSWR from 'swr';

import { getFeaturedEvents } from '../helpers/api-util';
import EventList from "../components/events/event-list";


const HomePage = (props) => {

  return (
    <div>
      <ul>
        <EventList events={props.events} />
      </ul>
    </div>
  )
};



export const getStaticProps = async () => {
  const transformedEvents = await getFeaturedEvents();

  return {
    props: {
      events: transformedEvents
    },
    revalidate: 1800
  }

};




export default HomePage
