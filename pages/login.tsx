import {
  Button,
  EyeIcon,
  Heading1,
  Input,
  InputWithIcon,
  MumbleWhite,
} from '@smartive-education/design-system-component-library-bytelight';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { ChangeEvent, useState } from 'react';

export default function Home() {
  const [credentials, setCredentials] = useState<{ username: string; password: string }>({
    username: '',
    password: '',
  });
  const { data: session } = useSession();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials((username) => ({ ...username, username: event.target.value }));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials((password) => ({ ...password, password: event.target.value }));
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col justify-center items-center bg-violet-600 h-screen sm:w-1/2 gap-y-5 px-5 sm:px-0">
          <MumbleWhite />
          <h1 className="text-white font-bold opacity-50 text-2xl md:text-4xl text-center max-w-[500px]">
            Find out what is new in #fashion
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center w-full sm:w-1/2 py-5 px-m sm:px-xxl gap-y-5 bg-slate-100">
          {session && (
            <>
              <Heading1>Abmelden</Heading1>
              <div className="inline-flex">
                <Button as="button" onClick={() => signOut({ callbackUrl: '/login' })}>
                  Logout
                </Button>
              </div>
            </>
          )}
          {!session && (
            <div className="flex flex-col gap-y-xs">
              <Heading1>Hey there.</Heading1>
              <div className="py-xs">
                <Input
                  placeholder=""
                  label="Username"
                  labelVariant="S"
                  onChange={handleUsernameChange}
                  value={credentials.username}
                />
                <InputWithIcon
                  icon={<EyeIcon size="16" />}
                  placeholder=""
                  label="Altes Passwort"
                  labelVariant="S"
                  onChange={handlePasswordChange}
                  isPasswordInput
                  value={credentials.password}
                />
              </div>
              <div className="inline-flex">
                <Button
                  as="button"
                  onClick={() => {
                    signIn('zitadel', { callbackUrl: '/' });
                  }}
                >
                  Login
                </Button>
              </div>
              <div className="inline-flex">
                <Button
                  as="button"
                  onClick={() => {
                    alert('stay tuned');
                  }}
                >
                  Sign up
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
