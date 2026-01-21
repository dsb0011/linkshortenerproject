import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/db";
import { shortenedLinks } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const userLinks = await db
    .select()
    .from(shortenedLinks)
    .where(eq(shortenedLinks.userId, userId))
    .orderBy(shortenedLinks.createdAt);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">
            Your Shortened Links
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {userLinks.length} {userLinks.length === 1 ? "link" : "links"}
          </p>
        </div>

        {userLinks.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="text-slate-600 dark:text-slate-400">
              No shortened links yet. Create one to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {userLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:shadow-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="inline-block rounded-md bg-blue-100 px-3 py-1 font-mono font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                      {link.shortCode}
                    </span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-600 hover:text-slate-900 hover:underline line-clamp-2 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                      {link.url}
                    </a>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                    Created {new Date(link.createdAt).toLocaleDateString()} at{" "}
                    {new Date(link.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
