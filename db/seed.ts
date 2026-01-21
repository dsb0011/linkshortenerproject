import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { shortenedLinks } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);

const exampleLinks = [
  {
    userId: "user_38Yjg4gOEFjvzljQLDVi2YBx1ez",
    url: "https://www.example.com/very-long-url-that-needs-shortening",
    shortCode: "abc123",
  },
  {
    userId: "user_38Yjg4gOEFjvzljQLDVi2YBx1ez",
    url: "https://github.com/user/repository/issues/42",
    shortCode: "gh42xy",
  },
  {
    userId: "user_38Yjg4gOEFjvzljQLDVi2YBx1ez",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    shortCode: "yt9wg",
  },
  {
    userId: "user_38Yjg4gOEFjvzljQLDVi2YBx1ez",
    url: "https://docs.drizzle.team/orm-docs/migrations",
    shortCode: "drz8kp",
  },
  {
    userId: "user_38Yjg4gOEFjvzljQLDVi2YBx1ez",
    url: "https://nextjs.org/docs/app/api-reference/functions/server-actions",
    shortCode: "nxt5sa",
  },
  {
    userId: "user_38Yjg4gOEFjvzljQLDVi2YBx1ez",
    url: "https://tailwindcss.com/docs/installation",
    shortCode: "tw3in",
  },
  {
    userId: "user_38Yjg4gOEFjvzljQLDVi2YBx1ez",
    url: "https://dashboard.clerk.com/apps",
    shortCode: "clk7ap",
  },
  {
    userId: "user_38Yjg4gOEFjvzljQLDVi2YBx1ez",
    url: "https://neon.tech/docs/introduction",
    shortCode: "neon1d",
  },
  {
    userId: "user_38Yjg4gOEFjvzljQLDVi2YBx1ez",
    url: "https://www.typescriptlang.org/docs/handbook/",
    shortCode: "ts2hb",
  },
  {
    userId: "user_38Yjg4gOEFjvzljQLDVi2YBx1ez",
    url: "https://www.postgresql.org/docs/current/index.html",
    shortCode: "pg10ix",
  },
];

async function seed() {
  try {
    console.log("🌱 Starting seed...");
    await db.insert(shortenedLinks).values(exampleLinks);
    console.log("✅ Seed completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
