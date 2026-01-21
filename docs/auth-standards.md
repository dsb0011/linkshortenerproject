# Authentication Standards

This document defines authentication requirements and patterns for the Link Shortener application.

## Core Principle

**All authentication is handled exclusively by Clerk.** No other authentication methods or providers should be implemented.

## Authentication Provider

- **Provider**: Clerk
- **Official Docs**: https://clerk.com/docs
- **Setup**: Configured through environment variables (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`)

## Protected Routes

### Dashboard Route (`/dashboard`)

The `/dashboard` page is a **protected route** and must enforce login:

1. **Middleware Protection**: Use Clerk middleware in `middleware.ts` to redirect unauthenticated users
2. **Server Component Guards**: Use `auth()` in Server Components to verify user session
3. **Error Handling**: Return appropriate error responses for unauthorized access

```typescript
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Dashboard content
}
```

## Authentication Modals

### Sign In & Sign Up

Sign in and sign up flows **must always launch as modals**, not full-page redirects:

- Use Clerk's `<SignIn />` and `<SignUp />` components with modal mode
- Place modals in the root layout or a dedicated auth modal component
- Ensure modals close after successful authentication

```typescript
import { SignIn, SignUp } from "@clerk/nextjs";

// Use with appearance prop to enable modal
<SignIn />  // Opens as modal by default in modal mode
<SignUp />  // Opens as modal by default in modal mode
```

## User State Handling

### Logged-In Users on Homepage

When a logged-in user accesses the homepage (`/`):

1. **Server-side Redirect**: Check authentication in the page Server Component
2. **Redirect to Dashboard**: Route authenticated users to `/dashboard`

```typescript
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  // Homepage content for unauthenticated users
}
```

## Clerk Configuration

### Required Environment Variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Middleware Setup

Create `middleware.ts` in the project root:

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (protectedRoutes(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

## User Information Access

Retrieve authenticated user information using Clerk hooks and functions:

### Server Components

```typescript
import { auth } from "@clerk/nextjs/server";

const { userId, sessionId } = await auth();
```

### Client Components

```typescript
import { useAuth, useUser } from '@clerk/nextjs';

export function UserProfile() {
  const { userId } = useAuth();
  const { user } = useUser();

  return <div>{user?.firstName}</div>;
}
```

## Security Best Practices

1. **Never** store secrets in client-side code
2. **Always** verify authentication server-side for protected routes
3. **Use** `@clerk/nextjs` utilities, not manual token handling
4. **Validate** user identity before performing sensitive operations
5. **Log out** properly using Clerk's `SignOutButton` or `useAuth().signOut()`

## Testing & Development

- Use Clerk's test mode in development
- Clear browser cookies/session when testing authentication flows
- Verify redirects work correctly for authenticated and unauthenticated states

---

**Last Updated**: January 2026  
**Related**: See [react-nextjs-standards.md](react-nextjs-standards.md) for Server/Client component patterns
