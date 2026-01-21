# Shadcn UI Standards

This document defines UI component standards for the Link Shortener application using Shadcn UI.

## Core Principle

**All UI elements must use Shadcn UI components.** No custom components should be created without explicit justification. Shadcn UI provides a comprehensive component library built on Radix UI primitives and styled with Tailwind CSS.

## Official Resources

- **Shadcn UI Docs**: https://ui.shadcn.com
- **Component Library**: https://ui.shadcn.com/docs/components/accordion
- **Installation Guide**: https://ui.shadcn.com/docs/installation/next

## Component Usage

### Available Components

Common Shadcn UI components for this project:

- **Layout**: `Button`, `Card`, `Container`, `Separator`, `Tabs`
- **Forms**: `Input`, `Label`, `Checkbox`, `Radio`, `Select`, `Textarea`, `Form`
- **Feedback**: `Alert`, `Badge`, `Progress`, `Skeleton`, `Toast`
- **Navigation**: `Breadcrumb`, `Dropdown Menu`, `Navigation Menu`, `Sidebar`
- **Data Display**: `Table`, `Avatar`, `Pagination`, `Sheet`
- **Dialogs**: `Dialog`, `Alert Dialog`, `Drawer`, `Sheet`

Visit https://ui.shadcn.com/docs/components to see all available components.

### Installation Pattern

When adding a new Shadcn UI component:

```bash
npx shadcn-ui@latest add component-name
```

Components are installed to `components/ui/` directory.

## Component Implementation

### Import Components

Always import from the `components/ui` directory:

```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
```

### Use in Server Components

Shadcn UI components can be used in Server Components by default:

```typescript
// app/dashboard/page.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### Use in Client Components

When creating interactive Client Components, use Shadcn UI with hooks:

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SearchForm() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex gap-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <Button onClick={() => console.log(query)}>Search</Button>
    </div>
  );
}
```

## Customization

### Styling with Tailwind

Extend Shadcn UI components using Tailwind CSS:

```typescript
import { Button } from '@/components/ui/button';

export function CustomButton() {
  return (
    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
      Gradient Button
    </Button>
  );
}
```

### Using `cn()` Utility

Use the `cn()` utility from `lib/utils.ts` to merge class names:

```typescript
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CustomButtonProps {
  variant?: 'primary' | 'secondary';
}

export function CustomButton({ variant = 'primary' }: CustomButtonProps) {
  return (
    <Button
      className={cn(
        variant === 'primary' && 'bg-blue-600',
        variant === 'secondary' && 'bg-gray-300',
      )}
    >
      Custom Button
    </Button>
  );
}
```

### Variants with CVA

For complex component variants, use `class-variance-authority` (CVA):

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from '@/components/ui/button';

const buttonVariants = cva('inline-flex items-center justify-center', {
  variants: {
    intent: {
      primary: 'bg-blue-600 text-white',
      secondary: 'bg-gray-200 text-gray-900',
    },
    size: {
      small: 'px-3 py-1 text-sm',
      large: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'large',
  },
});

interface CustomButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export function CustomButton({ intent, size, children }: CustomButtonProps) {
  return <button className={buttonVariants({ intent, size })}>{children}</button>;
}
```

## Common Patterns

### Form with Validation

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Invalid email');
      return;
    }
    setError('');
    // Handle signup
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button type="submit">Sign Up</Button>
    </form>
  );
}
```

### Modal Dialog

```typescript
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function ConfirmDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 justify-end">
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

## Accessibility

All Shadcn UI components are built on Radix UI and include proper accessibility features:

- **Semantic HTML**: Components use correct HTML elements
- **ARIA Attributes**: Proper ARIA labels and roles are included
- **Keyboard Navigation**: Full keyboard support by default
- **Focus Management**: Focus is automatically managed

Always provide proper labels and descriptions:

```typescript
<Label htmlFor="input-name">Full Name</Label>
<Input id="input-name" type="text" />
```

## Do's and Don'ts

### ✅ DO

- Use Shadcn UI components for all UI elements
- Customize with Tailwind CSS classes
- Leverage CVA for variant management
- Follow component prop interfaces
- Keep components composable and reusable

### ❌ DON'T

- Create custom HTML elements when Shadcn components exist
- Inline complex styles without using utilities
- Override Shadcn component internals
- Ignore accessibility features
- Mix component libraries (stick to Shadcn UI)

## Migration Guide

If you encounter an existing custom component:

1. Check if a Shadcn UI equivalent exists
2. Replace the custom component with Shadcn UI
3. Apply custom styling if needed with Tailwind
4. Update all imports and usages
5. Remove the custom component file

---

**Last Updated**: January 2026  
**Related**: See [styling-standards.md](styling-standards.md) for Tailwind CSS guidelines
