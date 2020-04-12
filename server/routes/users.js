import express from 'express';

let router = express.Router();
import { User } from '../models/user';


/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await User.query();
  console.log('users', users);
  res.send(users);
});

export default router;