# NextJS Github Repo Search

A simple app that searches Github for repositories based on any keyword. Built using NextJS while exploring new technologies - Chakra UI, Zod and tRPC.
For simplicity sake all potentially configurable values are kept inside the app - only `WORDPRESS_API_URL` was extracted as a env variable (see [Installation](#Installation)).

Challenge here was trying to recreate api request throttling functionality while using tRPC (tanstack-query underneath), which does not support any kind of debouncing/throttling natively ([nor it will](https://github.com/TanStack/query/issues/3331)).

[LogoAI](https://www.logoai.com/) was used to generate app logo.

## Demo

[Working Demo](https://nextjs-github-repo-search.vercel.app/)

## Requirements

- [Next.js](https://nextjs.org)
- [Chakra UI](https://chakra-ui.com/)
- [Zod](https://zod.dev/)
- [tRPC](https://trpc.io)

## Installation

Add following variables to your `.env` and then hit `npm install` & `npm run dev`:
- WORDPRESS_API_URL

## Deployment

Use Vercel or Netlify :)

## TODOs

Search "TODO" inside the repo.