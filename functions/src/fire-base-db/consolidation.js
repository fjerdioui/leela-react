function consolidateEvents(eventsFromAllSources) {
  const consolidatedEvents = [];
  const eventMap = new Map();

  eventsFromAllSources.forEach(events => {
    events.forEach(event => {
      const key = `${event.name}-${event.date}-${event.venue}`;
      if (!eventMap.has(key)) {
        eventMap.set(key, event);
        consolidatedEvents.push(event);
      }
    });
  });

  return consolidatedEvents;
}

module.exports = consolidateEvents;
