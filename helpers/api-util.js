
// we return a Promise here because of async
// that promise will be resolved by returning the events array below
export const getAllEvents = async () => {
  const response = await fetch('https://nextjs-course-15d9e-default-rtdb.firebaseio.com/events.json');
  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key]
    })
  }

  return events;
};


export const getFeaturedEvents = async () => {
  const allevents = await getAllEvents();

  return allevents.filter((event) => event.isFeatured);
};


export const getEventById = async (id) => {
  const allevents = await getAllEvents();

  return allevents.find((event) => event.id === id);
};



export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;

  const allevents = await getAllEvents();

  let filteredEvents = allevents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}