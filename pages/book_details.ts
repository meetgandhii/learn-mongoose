import express, { Request, Response } from 'express';
import Book from '../models/book';
import BookInstance from '../models/bookinstance';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const bookId = req.query.id as string;

    if (!bookId) {
        return res.status(400).send('Book ID is required');
    }

    try {
        const book = await Book.findById(bookId).populate('author').exec();
        if (!book) {
            return res.status(404).send('Book not found');
        }

        const bookInstances = await BookInstance.find({ book: bookId }).select('imprint status').exec();

        res.status(200).json({
            title: book.title,
            author: book.author.name,
            instances: bookInstances.map(instance => ({
                imprint: instance.imprint,
                status: instance.status,
            })),
        });
    } catch (error) {
        console.error('Error fetching book details:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
