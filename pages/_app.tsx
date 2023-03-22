import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Navbar } from '../components/navbar';
import '../styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      {router.pathname === '/login' ? (
        <Component {...pageProps} />
      ) : (
        <>
          <Navbar /> <Component {...pageProps} />
        </>
      )}
    </SessionProvider>
  );
}
