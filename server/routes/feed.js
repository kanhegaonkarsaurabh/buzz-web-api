import express from 'express';

let router = express.Router();
import { Event } from '../models/event';


/* GET users listing. */
router.get('/', async (req, res, next) => {
  let events = await Event.query();
  let liveEvents = events.filter((event) => event.isLive);
  console.log('liveEvents: ', liveEvents.length);
  res.send(liveEvents);
});

export default router;