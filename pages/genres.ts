import express, { Response } from 'express';
import Genre from '../models/genre';

const router = express.Router();

/**
 * @route GET /genres
 * @returns an array of all genres in the database
 * @returns 500 error if there is an issue fetching genres
 */
router.get('/', async (_, res: Response) => {
  try {
    const genres = await Genre.find().select('name');
    if (genres.length > 0) {
      res.status(200).send(genres);
    } else {
      res.status(404).send('No genres found');
    }
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).send('Error fetching genres');
  }
});

export default router;
