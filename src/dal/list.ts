import { asc, desc, eq } from "drizzle-orm";
import db from "../db";
import { CardTable, ListTable } from "../db/schema";
import { CreateListProps, UpdateListProps } from "../utils/types";

/* FETCH BOARD LISTS WITH CARDS */
export const getListsWithCards = async (boardId: string) => {
    const lists = await db.query
        .ListTable
        .findMany({
            where: eq(ListTable.boardId, boardId),
            with: {
                cards: {
                    with: {
                        attachments: true,
                        comments: true,
                        checklists: {
                            with: {
                                checklistItems: true
                            }
                        }
                    },
                    orderBy: asc(CardTable.position)
                }
            },
            orderBy: asc(ListTable.position)
            // orderBy: [
            //     orderBy == "date"
            //         ?
            //         order == "asc"
            //             ? asc(ListTable.createdAt)
            //             : desc(ListTable.createdAt)
            //         :
            //         order == "asc"
            //             ? asc(ListTable.position)
            //             : desc(ListTable.position)
            // ]
        });            

    return lists;
};

/* CREATE NEW LIST */
export const createListInDb = async (data: CreateListProps, boardId: string, position: number) => {
    const newList = await db.insert(ListTable)
        .values({
            ...data,
            boardId,
            position
        })
        .returning();

    return newList[0];
};

/* GET A SINGLE LIST */
export const getListFromDb = async (listId: string) => {
    const list = await db.query
        .ListTable
        .findFirst({
            where: eq(ListTable.listId, listId)
        });
    
    return list;
};

/* GET THE LAST LIST ITEM IN A BOARD */
export const getLastListItem = async (boardId: string) => {
    const listItem = await db.query
        .ListTable
        .findFirst({
            where: eq(ListTable.boardId, boardId),
            orderBy: desc(ListTable.position)
        });
    
    return listItem;
};

/* UPDATE BOARD */
export const updateListInDb = async (data: UpdateListProps, listId: string) => {
    const updatedList = await db.update(ListTable)
        .set(data)
        .where(
            eq(ListTable.listId, listId)
        )
        .returning()
    
    return updatedList[0];
};

/* DELETE SINGLE LIST */
export const deleteListFromDb = async (listId: string) => {
    const list = await db.delete(ListTable)
        .where(
            eq(ListTable.listId, listId)
        )
        .returning();
    
    return list[0];
};