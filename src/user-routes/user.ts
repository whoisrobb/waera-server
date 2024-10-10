import express, { Response, Request, NextFunction } from 'express';
import { updateUser } from '../logic/user';
import errorHandler from '../middleware/errorHandler';

const router = express.Router();

// UPDATE USER DATA
router.put('/save/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const { firstName, lastName, domain, description } = req.body;

        const updatedUser = await updateUser({
            firstName, lastName, domain, description
        }, userId, res);

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});


router.use(errorHandler);
export default router;