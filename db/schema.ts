import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const shortenedLinks = pgTable(
  "shortened_links",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(), // Clerk user ID
    url: text("url").notNull(), // Original URL
    shortCode: text("short_code").notNull(), // Unique short code
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    shortCodeIndex: uniqueIndex("short_code_idx").on(table.shortCode),
  }),
);
