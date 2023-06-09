This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, Install packages

```bash
npm install
# or
yarn install
```

Then, `copy .env.example to .env`, edit `.env` file according to server port for local development

```
NEXT_PUBLIC_LOCAL_PORT=8080 <- Local port of backend http://localhost:8080
NEXT_PUBLIC_NETWORK_SERVER= <- For product provide link here
```

Lastly, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Storybook

```bash
npm run storybook
# or
yarn storybook
```

## Test

1. Build

```bash
npm run build
# or
yarn build
```

2. Run Cypress

```bash
npm run test
# or
yarn test
```

For Continuous Development

```bash
npm run e2e
# or
yarn e2e
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
