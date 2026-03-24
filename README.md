# NextJS Github Repo Search

A simple app that searches GitHub for repositories based on any keyword. Built using Next.js 16, React 19, Chakra UI v3, and TanStack Query.
For simplicity’s sake all potentially configurable values are kept inside the app - only `NEXT_PUBLIC_GITHUB_TOKEN` was extracted as an env variable (see [Installation](#Installation)).

The challenge here was implementing API request debouncing functionality with TanStack Query, which does not support debouncing/throttling natively ([nor it will](https://github.com/TanStack/query/issues/3331)).
Solved by debouncing the search input value using the `use-debounce` library.

[LogoAI](https://www.logoai.com/) was used to generate app logo.

## Demo

[Working Demo](https://nextjs-github-repo-search.vercel.app/)

## Tech Stack

- [Next.js 16](https://nextjs.org)
- [React 19](https://react.dev)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Chakra UI v3](https://chakra-ui.com/)
- [TanStack Query v5](https://tanstack.com/query)
- [Octokit](https://github.com/octokit/octokit.js)
- [React Icons](https://react-icons.github.io/react-icons/)
- [use-debounce](https://github.com/xnimorz/use-debounce)

## Installation

Add the following variables to your `.env` and then hit `npm install` & `npm run dev`:

- NEXT_PUBLIC_GITHUB_TOKEN

## Deployment

Use Vercel or Netlify :)

## TODOs

Search "TODO" inside the repo.
