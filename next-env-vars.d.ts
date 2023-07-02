declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The issuer of the token
     */
    ZITADEL_ISSUER: string;

    /**
     * The client_id of the application the token was issued to
     */
    ZITADEL_CLIENT_ID: string;

    /**
     * Base url of the qwacker api
     */
    NEXT_PUBLIC_QWACKER_API_URL: string;
  }
}
