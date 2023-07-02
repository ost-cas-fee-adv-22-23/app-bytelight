# Dependencies stage
FROM node:16-alpine as dependencies
ARG NPM_TOKEN \
    NEXTAUTH_URL \
    NEXTAUTH_SECRET \
    ZITADEL_ISSUER \
    ZITADEL_CLIENT_ID \
    NEXT_PUBLIC_QWACKER_API_URL

ENV NPM_TOKEN=${NPM_TOKEN} \
    NEXTAUTH_URL=${NEXTAUTH_URL} \
    NEXTAUTH_SECRET=${NEXTAUTH_SECRET} \
    ZITADEL_ISSUER=${ZITADEL_ISSUER} \
    ZITADEL_CLIENT_ID=${ZITADEL_CLIENT_ID} \
    NEXT_PUBLIC_QWACKER_API_URL=${NEXT_PUBLIC_QWACKER_API_URL}

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

EXPOSE 3000

CMD ["npm", "run", "start", "--", "--port", "3000"]
