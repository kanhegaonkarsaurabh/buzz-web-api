import express from 'express';

let router = express.Router();
import { Event } from '../models/event';


const getLiveEvents = async (userLocation) => {
  if (userLocation) { // user has given his location
    // https://developers.google.com/web/fundamentals/native-hardware/user-location#determining_the_users_current_location
    const { latitude, longitude } = userLocation.coords;

    // send live events sorted by location, then ended events sorted by endTimestamp 
    let now = new Date().toUTCString();
    let sortedLiveEvents = await Event
    .query()
    .select()
    .where('startTimestamp', '<', now)
    .where('endTimestamp', '>', now)
    .orderByRaw('ST_MakePoint(coordinate[0], coordinate[1]) <-> ST_MakePoint(?, ?)::geography', [longitude, latitude])
    .debug();

    return sortedLiveEvents;
  }
}

const getEndedEvents = async () => {
  let now = new Date().toUTCString();
  const sortedEndedEvents = await Event
  .query()
  .select()
  .where('startTimestamp', '>=', now)
  .orWhere('endTimestamp', '<=', now)
  .orderBy('endTimestamp', 'desc');

  return sortedEndedEvents;
}

/* GET users listing. */
router.get('/events', async (req, res, next) => {
  let liveEvents = await getLiveEvents({
    coords: {
      longitude: -122.19561,
      latitude: 47.82152
    }
  });

  let endedEvents = await getEndedEvents();
  res.send({events: [...liveEvents, ...endedEvents]});
});

export default router;