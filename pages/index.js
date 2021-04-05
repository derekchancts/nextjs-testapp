import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data"


const HomePage = () => {
  const featuredEvents = getFeaturedEvents();


  return (
    <div>
      <ul>

        <EventList events={featuredEvents} />

        {/* {
          featuredEvents.map(event => {
            return (
              <li key={event.id}>
                <EventList event={event} />
              </li>
            )
          })
        } */}

      </ul>
    </div>
  )
}

export default HomePage
