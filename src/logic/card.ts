import { Response } from "express";
import { createCardInDb, deleteCardFromDb, getLastCardItem, updateCardInDb } from "../dal/card";
import { getListFromDb } from "../dal/list";
import { NotFoundError } from "../utils/errors";
import { CreateCardProps, UpdateCardProps } from "../utils/types";


export const createCardItem = async (data: CreateCardProps, listId: string, res: Response) => {
    const list = await getListFromDb(listId);

    if (!list) {
        throw new NotFoundError('List not found')
    };

    const lastCard = await getLastCardItem(listId);    
    const position = lastCard ? lastCard.position + 1 : 0;

    const newCard = await createCardInDb(data, listId, position);

    return newCard;
};

export const updateCard = async (data: UpdateCardProps, cardId: string, res: Response) => {
    // TODO: Add validation logic'

    const updatedCard = await updateCardInDb(data, cardId);
    return updatedCard;
};

export const deleteSingleCard = async (cardId: string, res: Response) => {
    const card = await deleteCardFromDb(cardId);

    if (!card) {
        throw new NotFoundError('Card not found!');
    }

    return card;
};