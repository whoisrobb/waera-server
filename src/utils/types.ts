import { Card, List } from "../db/schema";

export type UpdateUserProps = {
    firstName?: string;
    lastName?: string;
    domain?: string;
    description?: string;
};

export type CreateBoardProps = {
    name: string;
    description: string;
};

export type UpdateBoardProps = {
    name?: string;
    description?: string;
};

export type CreateListProps = {
    name: string;
};

export type UpdateListProps = {
    name?: string;
    position?: number;
};

// export type ListWithCards = List & {
//     cards: Card[];
// };
export type ListWithCards = {
    listId: string;
    name: string;
    position: number;
    boardId: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    cards: Card[];
}

export type CreateCardProps = {
    name: string;
};

export type UpdateCardProps = {
    name?: string;
    description?: string;
    dueDate?: string;
    listId?: string;
    position?: number;
};

export type CreateLabelProps = {
    name: string;
    color: string;
};