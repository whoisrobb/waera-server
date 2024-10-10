import express, { Response, Request, NextFunction } from 'express';
import errorHandler from "../middleware/errorHandler";
import { createListItem, deleteSingleList, getBoardListsWithCards, updateList, updateListsDnd } from '../logic/list';

const router = express.Router();

/* CREATE LIST */
router.post('/lists/create/:boardId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { boardId } = req.params;
        const { name } = req.body;
        const newList = await createListItem(
            { name }, boardId, res
        );
        res.status(201).json(newList);
    } catch (error) {
        next(error);
    }
});

/* GET FILTERED LISTS */
router.post('/lists/:boardId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { order, orderBy } = req.body;
        const { boardId } = req.params;
        const lists = await getBoardListsWithCards(boardId, res);
        res.status(200).json(lists);
    } catch (error) {
        next(error);
    }
});

/* UPDATE LIST */
router.put('/lists/list/update/:listId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const { listId } = req.params;

        const updatedList = await updateList(
            { name },
            listId, res
        );

        res.status(201).json(updatedList);
    } catch (error) {
        next(error);
    }
});

/* UPDATE ON DRAG & DROP */
router.put('/lists/update/dnd', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { lists } = req.body;
        await updateListsDnd(lists, res);
        res.status(204);
    } catch (error) {
        next(error);
    }
});

/* DELETE LIST */
router.delete('/lists/list/delete/:listId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { listId } = req.params;
        const deletedList = await deleteSingleList(listId, res);
        res.status(200).json(deletedList);
    } catch (error) {
        next(error);
    }
});


router.use(errorHandler);
export default router;