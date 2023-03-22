import { Button, Heading1, MumbleWhite } from '@smartive-education/design-system-component-library-bytelight';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="h-screen w-screen grid-rows-2">
          <div className="flex">
            <div className="flex flex-col justify-center items-center bg-violet-600 h-screen w-1/2 gap-y-5">
              <MumbleWhite />
              <h1 className="text-white font-bold opacity-50 text-4xl text-center max-w-[500px]">
                Find out what is new in #fasion
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center w-1/2 px-44 gap-y-5">
              {!!session && (
                <>
                  <Heading1>Abmelden</Heading1>
                  <Button as="button" onClick={() => signOut()}>
                    Logout
                  </Button>
                </>
              )}
              {!session && (
                <>
                  <Heading1>Anmelden</Heading1>
                  <Button
                    as="button"
                    onClick={() => {
                      signIn('zitadel');
                    }}
                  >
                    Login
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
