import { Response } from "express";
import { createBoardInDb, deleteBoardFromDb, getBoardFromDb, getBoardsByUserId, updateBoardInDb } from "../dal/board";
import { CreateBoardProps, UpdateBoardProps } from "../utils/types";
import { NotFoundError } from "../utils/errors";

export const getUserBoards = async (userId: string) => {
    const boards = await getBoardsByUserId(userId);
    return boards;
}

export const createUserBoard = async (data: CreateBoardProps, userId: string, res: Response) => {
    // TODO: Add validation logic'

    const board = await createBoardInDb(data, userId);
    return board;
};

export const updateUserBoard = async (data: UpdateBoardProps, boardId: string, res: Response) => {
    // TODO: Add validation logic'

    const board = await updateBoardInDb(data, boardId);
    return board;
};

export const getSingleBoard = async (boardId: string, res: Response) => {
    const board = await getBoardFromDb(boardId);

    if (!board) {
        throw new NotFoundError('Board not found!');
    }

    return board;
};

export const deleteSingleBoard = async (boardId: string, res: Response) => {
    const board = await deleteBoardFromDb(boardId);

    if (!board) {
        throw new NotFoundError('Board not found!');
    }

    return board;
};