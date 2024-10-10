import { eq } from "drizzle-orm";
import db from "../db";
import { BoardTable } from "../db/schema";
import { CreateBoardProps, UpdateBoardProps } from "../utils/types";

/* GET A USER'S BOARDS */
export const getBoardsByUserId = async (userId: string) => {
    const boards = await db.select()
        .from(BoardTable) 
        .where(
            eq(BoardTable.userId, userId)
        );
    
    return boards;
};

/* CREATE BOARD */
export const createBoardInDb = async (data: CreateBoardProps, userId: string) => {
    const newBoard = await db.insert(BoardTable)
        .values({
            ...data,
            userId: userId
        })
        .returning()
    
    return newBoard[0];
};

/* UPDATE BOARD */
export const updateBoardInDb = async (data: UpdateBoardProps, boardId: string) => {
    const updatedBoard = await db.update(BoardTable)
        .set(data)
        .where(
            eq(BoardTable.boardId, boardId)
        )
        .returning()
    
    return updatedBoard[0];
};

/* GET A SINGLE BOARD */
export const getBoardFromDb = async (boardId: string) => {
    const board = await db.query
        .BoardTable
        .findFirst({
            where: eq(BoardTable.boardId, boardId)
        });
    
    return board;
};

/* DELETE SINGLE BOARD */
export const deleteBoardFromDb = async (boardId: string) => {
    const board = await db.delete(BoardTable)
        .where(
            eq(BoardTable.boardId, boardId)
        )
        .returning();
    
    return board[0];
};