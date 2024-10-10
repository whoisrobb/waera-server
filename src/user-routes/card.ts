import express, { Response, Request, NextFunction } from 'express';
import errorHandler from "../middleware/errorHandler";
import { createCardItem, deleteSingleCard, updateCard } from '../logic/card';

const router = express.Router();

/* CREATE CARD */
router.post('/cards/create/:listId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { listId } = req.params;
        const { name } = req.body;
        
        const newCard = await createCardItem(
            { name },
            listId, res
        );

        res.status(201).json(newCard)
    } catch (error) {
        next(error);
    }
});

/* UPDATE CARD DETAILS */
router.put('/cards/card/update/:cardId',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cardId } = req.params;
        const { name, description, dueDate } = req.body;

        const updatedCard = await updateCard(
            { name, description, dueDate },
            cardId, res
        );

        res.status(201).json(updatedCard);
    } catch (error) {
        next(error);
    }
});

/* DELETE LIST */
router.delete('/cards/card/delete/:cardId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cardId } = req.params;
        const deletedCard = await deleteSingleCard(cardId, res);
        res.status(200).json(deletedCard);
    } catch (error) {
        next(error);
    }
});


router.use(errorHandler);
export default router;