import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Link2, Zap, BarChart3, Lock } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }
  const features = [
    {
      icon: Link2,
      title: "Instant Shortening",
      description:
        "Convert long URLs into short, shareable links instantly with a single click",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized for speed with global CDN distribution ensuring fast redirects",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description:
        "Track clicks, geographic data, and referrer information in real-time",
    },
    {
      icon: Lock,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with SSL encryption and 99.9% uptime",
    },
  ];

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-32 text-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Shorten Your Links, Amplify Your Reach
          </h1>
          <p className="text-xl text-muted-foreground">
            Transform long, unwieldy URLs into concise, memorable short links.
            Perfect for social media, marketing campaigns, and sharing with
            anyone.
          </p>
          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center">
            <SignInButton mode="modal">
              <Button size="lg">Get Started Free</Button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="border-t bg-muted/50 px-4 py-20 sm:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold tracking-tight">
              Powerful Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to manage and track your shortened links
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="rounded-lg border bg-card p-6 shadow-sm"
                >
                  <Icon className="mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Ready to Shorten Your Links?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of users who are already using our link shortener to
            save time and track their links.
          </p>
          <SignInButton mode="modal">
            <Button size="lg" className="mt-8">
              Start Shortening Links Now
            </Button>
          </SignInButton>
        </div>
      </section>
    </main>
  );
}
