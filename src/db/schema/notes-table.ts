import { json, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user-table";
import { relations, sql } from "drizzle-orm";

export const NotesTable = pgTable("notesTable", {
    noteId: uuid("noteId").defaultRandom().primaryKey(),
    title: varchar("title").notNull(),
    description: text("description"),
    content: json("content").$type<any>().default(""),
    userId: uuid("userId").references(() => UserTable.userId),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
});

export const NotesTableRelations = relations(NotesTable,
    ({ one }) => {
        return {
            user: one(UserTable, {
                fields: [NotesTable.userId],
                references: [UserTable.userId]
            })
        }
    }
);

export type Notes = typeof NotesTable.$inferSelect;