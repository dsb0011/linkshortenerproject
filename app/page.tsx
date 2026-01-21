import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-32">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Link Shortener</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Create short, memorable links in seconds
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </Button>
      </div>
    </main>
  );
}
