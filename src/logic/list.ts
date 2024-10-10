import { Response } from "express";
import { createListInDb, deleteListFromDb, getLastListItem, getListsWithCards, updateListInDb } from "../dal/list";
import { CreateListProps, ListWithCards, UpdateListProps } from "../utils/types";
import { getBoardFromDb } from "../dal/board";
import { NotFoundError } from "../utils/errors";
import { updateCard } from "./card";

export const getBoardListsWithCards = async (boardId: string, res: Response) => {
    // TODO: Add validation logic'

    const board = await getListsWithCards(boardId);
    return board;
};

export const createListItem = async (data: CreateListProps, boardId: string, res: Response) => {
    const board = await getBoardFromDb(boardId);

    if (!board) {
        throw new NotFoundError('Board not found')
    };

    const lastList = await getLastListItem(boardId);    
    const position = lastList ? lastList.position + 1 : 0;

    const newList = await createListInDb(data, boardId, position);

    return newList;
};

export const updateList = async (data: UpdateListProps, listId: string, res: Response) => {
    // TODO: Add validation logic'

    const updatedList = await updateListInDb(data, listId);
    return updatedList;
};

export const updateListsDnd = async (lists: ListWithCards[], res: Response) => {
    for (let i = 0; i < lists.length; i++) {
        const { position, listId } = lists[i];
        const updatedList = await updateList({ position }, listId, res);

        const test = lists[i].cards;
        console.log('test', test)
        
        for (let j = 0; j < lists[i].cards.length; j++) {
            const { listId, position, cardId } = lists[i].cards[j];
            const updatedCard = await updateCard({ listId, position }, cardId, res);
        }
    }
};

export const deleteSingleList = async (listId: string, res: Response) => {
    const list = await deleteListFromDb(listId);

    if (!list) {
        throw new NotFoundError('List not found!');
    }

    return list;
};