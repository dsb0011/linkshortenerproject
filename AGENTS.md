# LLM Agent Instructions

This document provides coding standards and guidelines for LLMs working on this Link Shortener project. These standards ensure consistency, maintainability, and quality across the codebase. ALWAYS refer to the relevant .md file BEFORE generating any code:

## Project Overview

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: Drizzle ORM with Neon (serverless PostgreSQL)
- **Authentication**: Clerk
- **Styling**: Tailwind CSS + PostCSS v4
- **UI Components**: Lucide React icons, CVA for component variants

## Coding Standards

All LLM agents must adhere to the following standards when contributing code:

### 3. [Authentication Standards](docs/auth-standards.md)

- Clerk configuration and setup
- Protected routes
- Authentication modals
- User redirects and state handling

### 4. [Shadcn UI Standards](docs/shadcn-ui-standards.md)

- Component usage and installation
- Customization patterns
- Form and dialog implementations
- Accessibility guidelines

## Quick Reference

### File Structure

```
project-root/
├── app/                    # Next.js App Router pages/layouts
├── components/             # Reusable React components
├── db/                     # Database schema and clients
├── lib/                    # Utility functions and helpers
├── docs/                   # Documentation
├── public/                 # Static assets
├── drizzle.config.ts       # Drizzle ORM configuration
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── eslint.config.mjs       # ESLint rules
```

### Key Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
```

## General Principles

1. **Type Safety First**: Always use TypeScript types. No `any` unless absolutely necessary and documented.
2. **Performance**: Use Next.js Server Components by default. Only use Client Components when state/interactivity is required.
3. **DRY Principle**: Extract reusable components and utilities to prevent duplication.
4. **Accessibility**: Follow WCAG guidelines. Use semantic HTML and proper ARIA labels.
5. **Security**: Sanitize inputs, validate data, and use environment variables for secrets.
6. **Testing**: Write tests for critical functionality and utilities.
7. **Documentation**: Document complex logic, API responses, and architectural decisions.

## Before Starting Work

- Review the relevant standard document for the area you're working on
- Check existing similar code patterns in the project
- Ensure all new code passes ESLint (`npm run lint`)
- Test changes locally with `npm run dev`
- Follow commit message conventions: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`

## Standards Index

| Area            | Documentation                                               |
| --------------- | ----------------------------------------------------------- |
| TypeScript      | [typescript-standards.md](docs/typescript-standards.md)     |
| React & Next.js | [react-nextjs-standards.md](docs/react-nextjs-standards.md) |
| Authentication  | [auth-standards.md](docs/auth-standards.md)                 |
| UI Components   | [shadcn-ui-standards.md](docs/shadcn-ui-standards.md)       |
| Styling         | [styling-standards.md](docs/styling-standards.md)           |
| Database        | [database-standards.md](docs/database-standards.md)         |
| Code Quality    | [code-quality-standards.md](docs/code-quality-standards.md) |

---

**Last Updated**: January 2026  
**Project Version**: 0.1.0
