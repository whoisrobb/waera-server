import express, { Response, Request, NextFunction } from 'express';
import errorHandler from "../middleware/errorHandler";

const router = express.Router();

/* CREATE LABEL */
router.post('/label/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, color } = req.body;

        const newLabel = await db.insert(LabelTable).values({
                name: labelName,
                color: color
            })
            .returning();

        res.status(201).json(newLabel[0]);
    } catch (error) {
        next(error);
    }
});


router.use(errorHandler);
export default router;