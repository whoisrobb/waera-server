import express, { Response, Request, NextFunction } from 'express';
import { createUserBoard, deleteSingleBoard, getSingleBoard, getUserBoards, updateUserBoard } from '../logic/board';
import errorHandler from '../middleware/errorHandler';

const router = express.Router();

/* CREATE BOARD */
router.post('/boards/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { boardName, description, userId } = req.body;

        const newBoard = await createUserBoard(
            { name: boardName, description },
            userId, res
        );

        res.status(201).json(newBoard);
    } catch (error) {
        next(error);
    }
});

/* GET A USER'S BOARDS */
router.get('/boards/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const boards = await getUserBoards(userId);
        res.status(200).json(boards);
    } catch (error) {
        next(error);
    }
});

/* GET A SINGLE BOARD */
router.get('/boards/board/:boardId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { boardId } = req.params;
        const board = await getSingleBoard(boardId, res);
        res.status(200).json(board);
    } catch (error) {
        next(error);
    }
});

/* UPDATE BOARD */
router.put('/boards/board/update/:boardId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description } = req.body;
        const { boardId } = req.params;

        const updatedBoard = await updateUserBoard(
            { name, description },
            boardId, res
        );

        res.status(201).json(updatedBoard);
    } catch (error) {
        next(error);
    }
});

/* DELETE BOARD */
router.delete('/boards/board/delete/:boardId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { boardId } = req.params;
        const deletedBoard = await deleteSingleBoard(boardId, res);
        res.status(200).json(deletedBoard);
    } catch (error) {
        next(error);
    }
});


router.use(errorHandler);
export default router;