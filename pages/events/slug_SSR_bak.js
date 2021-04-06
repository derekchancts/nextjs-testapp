import { Fragment } from "react";
import { useRouter } from "next/router";

import EventList from '../../components/events/event-list';
import ResultsTitle from "../../components/events/results-title";

// import { getFilteredEvents } from "../../dummy-data";
import { getFilteredEvents } from '../../helpers/api-util';

import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';



const FilteredEventsPage = (props) => {
  const router = useRouter();
  // console.log(router.query)
  //  


  if ( props.hasError
    // isNaN(numYear) ||
    // isNaN(numMonth) ||
    // numYear > 2030 ||
    // numYear < 2021 ||
    // numMonth < 1 ||
    // numMonth > 12
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



  // const filteredEvents = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth
  // });

  const filteredEvents = props.events;


  // console.log(filteredEvents)
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


  // const date = new Date(numYear, numMonth - 1);
  const date = new Date(props.numYear, props.numMonth - 1);


  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents}/>
    </Fragment>
  );
};



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



export default FilteredEventsPage;
