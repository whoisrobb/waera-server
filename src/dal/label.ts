import db from "../db";
import { LabelTable } from "../db/schema";
import { CreateLabelProps } from "../utils/types";

/* CREATE NEW LIST */
export const createLabelInDb = async (data: CreateLabelProps, boardId: string, position: number) => {
    const newLabel = await db.insert(LabelTable)
        .values(data)
    .returning();

    return newLabel[0];
};