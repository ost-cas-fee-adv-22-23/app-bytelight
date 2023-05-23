# Dependencies stage
FROM node:16-alpine as dependencies
ARG NPM_TOKEN

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN echo "//npm.pkg.github.com/:_authToken=$NPM_TOKEN" > .npmrc && \
    npm ci && \
    rm -rf .npmrc

COPY . .

RUN npm run build

# Production stage
FROM node:16-alpine AS production
ENV NODE_ENV=production

WORKDIR /app

COPY --from=dependencies /app/package*.json ./
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/.next ./.next

ENV NEXTAUTH_URL=
ENV NEXTAUTH_SECRET=
ENV NEXT_PUBLIC_QWACKER_API_URL=
ENV ZITADEL_ISSUER=
ENV ZITADEL_CLIENT_ID=

EXPOSE 3000

CMD ["npm", "run", "start", "--", "--port", "3000"]
