import { Response } from "express";
import { updateUserInDb } from "../dal/user";
import { NotFoundError } from "../utils/errors";
import { UpdateUserProps } from "../utils/types";
import { initials } from "../utils/utils";

export const updateUser = async (data: UpdateUserProps, userId: string, res: Response) => {
    // TODO: Add validation logic'

    const updatedUser = await updateUserInDb(data, userId);

    if (!updatedUser === undefined) {
        throw new NotFoundError('User not found')
    }

    return { ...updatedUser[0], initials: initials(updatedUser[0].firstName, updatedUser[0].lastName) };
};