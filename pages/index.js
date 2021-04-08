import { useEffect, useState } from 'react'
import useSWR from 'swr';
import Head from 'next/head';

import { getFeaturedEvents } from '../helpers/api-util';
import EventList from "../components/events/event-list";
import NewsletterRegistration from '../components/input/newsletter-registration';


const HomePage = (props) => {

  return (
    <div>
      <ul>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events" />
      </Head>
        <NewsletterRegistration />
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
