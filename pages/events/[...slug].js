import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from 'swr';
import Head from 'next/head';

import EventList from '../../components/events/event-list';
import ResultsTitle from "../../components/events/results-title";

// import { getFilteredEvents } from "../../dummy-data";
import { getFilteredEvents } from '../../helpers/api-util';

import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';


const FilteredEventsPage = (props) => {
  const [loadedEvents, setLoadedEvents] = useState([]);

  const router = useRouter();
  // console.log(router.query)

  // IF WE NEED CLIEN SIDE FETCHING (TO IMPROVE SPEED ON CERTAIN PAGES, AND WHEN SEO / WEB CRAWLERS ARE NOT AS IMPORTANT)
  const filteredData = router.query.slug;

  const { data, error } = useSWR('https://nextjs-course-15d9e-default-rtdb.firebaseio.com/events.json');

  
  useEffect(() => {
    if (data) {
      const events = [];
  
      for (const key in data) {
        events.push({
          id: key,
          ...data[key]
        })
      };
    
      // return events;
      setLoadedEvents(events);
    }
  }, [data])



  // const filteredYear = filteredData[0];
  // const filteredMonth = filteredData[1];

  // const numYear = +filteredYear; // converts string to a number
  // const numMonth = +filteredMonth;



  // const pageHeadData = (
  //   <Head>
  //     <title>{filteredEvents.title}</title>
  //     <meta name="description1" content="Find a lot of great events" />
  //     <meta name="description" content={`All Events for ${numMonth}/${numYear}`} />
  //   </Head>
  // );



  if (!filteredData) {
    return (
      <Fragment>
        {/* {pageHeadData} */}
        <p className='center'>Loading...</p>
      </Fragment>
    )
  };

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear; // converts string to a number
  const numMonth = +filteredMonth;



  // CHECK THE FILTERED EVENTS SELECTED
  if ( 
    //props.hasError,
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert><p>Invalid filter. Please adjust your values.</p></ErrorAlert>
        <div className="center">
          <Button link='/events'>Show All Events</Button>
        </div>
    </Fragment>
    
    )
  };


  // FILTER THE EVENTS
  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });



  // const filteredEvents = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth
  // });

  // const filteredEvents = props.events;

  // console.log(filteredEvents)

  // IF WE DO NOT HAVE TEH FILTERED EVENTS
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert><p>No events found for the chosen filter</p></ErrorAlert>
        <div className="center">
         <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    )
  };

  const date = new Date(numYear, numMonth - 1);
  // const date = new Date(props.numYear, props.numMonth - 1);

  return (
    <Fragment>
      {/* {pageHeadData} */}
       <Head>
        <title>{filteredEvents.title}</title>
        <meta name="description1" content="Find a lot of great events" />
        <meta name="description" content={`All Events for ${numMonth}/${numYear}`} />
      </Head>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents}/>
    </Fragment>
  );
};



/*
export const getServerSideProps = async(context) => {
  const { params } = context;

  const filteredData = params.slug;

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear; // converts string to a number
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 
  ) {
    return {
      // server side props - we do not return JSX, but always an OBJECT instead

      props: { hasError: true },

      // notFound: true,  // show 404 page

      // redirect: {
      //   destination: '/error'   // can consider redirecting to an error page etc
      // },

    };
  };


  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth
  });

  return {
    props: {
      events: filteredEvents,
      numYear,
      numMonth,
      date: {
        year: numYear,
        month: numMonth
      },
    }
  };
};
*/


export default FilteredEventsPage;
