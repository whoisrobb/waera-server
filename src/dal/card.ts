import { desc, eq } from "drizzle-orm";
import db from "../db";
import { CardTable } from "../db/schema";
import type { CreateCardProps, UpdateCardProps } from "../utils/types";


/* CREATE NEW CARD */
export const createCardInDb = async (data: CreateCardProps, listId: string, position: number) => {
    const newCard = await db.insert(CardTable)
        .values({
            ...data,
            listId,
            position
        })
        .returning();

    return newCard[0];
};

/* GET THE LAST CARD ITEM IN A LIST */
export const getLastCardItem = async (listId: string) => {
    const cardItem = await db.query
        .CardTable
        .findFirst({
            where: eq(CardTable.listId, listId),
            orderBy: desc(CardTable.position)
        });
    
    return cardItem;
};

/* UPDATE BOARD */
export const updateCardInDb = async (data: UpdateCardProps, cardId: string) => {
    const updatedCard = await db.update(CardTable)
        .set(data)
        .where(
            eq(CardTable.cardId, cardId)
        )
        .returning()
    
    return updatedCard[0];
};

/* DELETE SINGLE CARD */
export const deleteCardFromDb = async (cardId: string) => {
    const card = await db.delete(CardTable)
        .where(
            eq(CardTable.cardId, cardId)
        )
        .returning();
    
    return card[0];
};