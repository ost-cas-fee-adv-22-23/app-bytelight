This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Live Demo

The latest version of the App is available [here](https://app-bytelight-two.vercel.app/).

## Clone the repo.

`git clone https://github.com/smartive-education/app-bytelight`

## Authenticating GitHub Registry

1. Create a personal GitHub access token.
2. Create a new ~/.npmrc file if one doesn't exist.
3. Include the following line, replacing TOKEN with your personal access token.

```console
@smartive-education:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=[TOKEN]
```

## 3. Create a local security environment file for variables.

Create a `.env` file and copy these keys and insert confidential values

    # Qwacker backend
    NEXT_PUBLIC_QWACKER_API_URL= [QWACKER_API_URL]

    # Authentication
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=[NEXTAUTH_SECRET]

    ZITADEL_ISSUER=[ZITADEL ISSUER URL]
    ZITADEL_CLIENT_ID=[ZITADEL CLIENT ID]

## Next-App Installation

```console
npm ci
```

# Getting Started

First, run the development server:

```console
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To build the application local run:

```console
npm run build
```

### Scripts

#### ESLint

ESLint is configured to check:

```console
npm run lint
npm run lint:fix
```

#### Prettier

Prettier configuration:

- "@smartive/prettier-config"

```console
npm run prettier
npm run prettier:check
```

#### Prettier & ESLint

```console
npm run style-check
```
