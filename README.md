<h1 align="center">Wondrous</h1>

![Demo App](/public/readme.png)

Motivation:

Reading is a newfound passion of mine, and I wanted a platform where I could share my thoughts on books I’m reading. Just as importantly, I wanted to see what others are reading and engage with their reflections.

---
Highlights:

- **Tech stack**: Next.js, TypeScript, Postgres
- **Modern Next.js features**: Server Components, Layouts, Route Handlers, Server Actions
- **Authentication**: [Clerk](https://clerk.com)
- **File uploads**: [UploadThing](https://uploadthing.com)
- **Database**: Prisma + Postgres
- **API Integration** via Route Handlers
- **Forms + Server Actions** with validation
- **Optimistic UI updates** for a smooth user experience

---
### Setup

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
UPLOADTHING_TOKEN=
```

```shell
npm run dev
```