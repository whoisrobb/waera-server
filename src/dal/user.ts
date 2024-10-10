import { eq } from "drizzle-orm";
import db from "../db";
import { UserTable } from "../db/schema";
import { UpdateUserProps } from "../utils/types";

export const updateUserInDb = async (data: UpdateUserProps, userId: string) => {
    const user = await db.update(UserTable)
        .set(data)
        .where(
            eq(UserTable.userId, userId)
        )
        .returning({
            userId: UserTable.userId,
            firstName: UserTable.firstName,
            lastName: UserTable.lastName,
            email: UserTable.email,
            domain: UserTable.domain,
            description: UserTable.description,
            avatar: UserTable.avatar,
        })
    
    return user;
};

export const findUserById = async (userId: string) => {
    const user = await db.query
        .UserTable
        .findFirst({
            where: eq(UserTable.userId, userId)
        });

    return user;
}