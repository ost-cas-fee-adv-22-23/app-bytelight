import { Button, Heading2, Heading4 } from '@smartive-education/design-system-component-library-bytelight';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getToken } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../components/loading-spinner';
import { MumblePost } from '../components/mumble-post';
import { TextareaCard } from '../components/textarea-card';
import { Mumble, fetchMumbles } from '../services/qwacker';

type PageProps = {
  count: number;
  mumbles: Mumble[];
  error?: string;
};
export default function Page({
  count,
  mumbles: initialMumbles,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [mumbles, setMumbles] = useState(initialMumbles);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialMumbles.length < count);
  const [hasNew, setHasNew] = useState(false);
  const { data: session } = useSession();

  const token = session?.accessToken;

  useEffect(() => {
    const intervalId = setInterval(checkNew, 3000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mumbles, hasNew]);

  if (error) {
    return <div>An error occurred: {error}</div>;
  }

  const loadMore = async () => {
    const { count, mumbles: oldMumbles } = await fetchMumbles({
      limit: 10,
      olderThanMumbleId: mumbles[mumbles.length - 1].id,
      accessToken: token,
    });

    setLoading(false);
    setHasMore(mumbles.length + oldMumbles.length < count);
    setMumbles([...mumbles, ...oldMumbles]);
  };

  const loadNew = async () => {
    const { mumbles: newMumbles } = await fetchMumbles({
      limit: 1000,
      newerThanMumbleId: mumbles[0].id,
      accessToken: token,
    });

    setMumbles([...newMumbles, ...mumbles]);
    setHasNew(false);
  };

  const checkNew = async () => {
    if (hasNew) {
      return;
    }
    const { mumbles: newMumbles } = await fetchMumbles({
      limit: 1,
      newerThanMumbleId: mumbles[0].id,
      accessToken: token,
    });

    setHasNew(!!newMumbles.length);
  };

  return (
    <>
      <Head>
        <title>Feed</title>
      </Head>
      <div className="bg-slate-100 flex flex-col items-center w-screen">
        {hasNew && (
          <div className="sticky top-0 z-10 pt-xs">
            <Button onClick={() => loadNew()} as="button">
              Get newest Mumbles
            </Button>
          </div>
        )}
        <div className="flex flex-col justify-center w-[680px] mt-8 [&>h2]:text-violet-600 [&>h4]:text-slate-500 gap-y-xs">
          <Heading2>Willkommen auf Mumble</Heading2>
          <Heading4>Voluptatem qui cumque voluptatem quia tempora dolores distinctio vel repellat dicta.</Heading4>
          <div className="py-s">
            <TextareaCard />
          </div>
        </div>
        <ul className="flex flex-col gap-y-s">
          {mumbles.map((mumble) => (
            <li key={mumble.id}>
              <MumblePost post={mumble} />
            </li>
          ))}
        </ul>
        {hasMore && (
          <div className="flex justify-center bg-[#F1F5F9] py-l">
            <Button onClick={() => loadMore()} as="button">
              {loading ? <LoadingSpinner imageWidth={100} /> : 'Load more'}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps<PageProps> = async ({ req }) => {
  const token = await getToken({ req });

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const { count, mumbles } = await fetchMumbles({ limit: 10, accessToken: token.accessToken });

    return { props: { count, mumbles } };
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }

    return { props: { error: message, mumbles: [], count: 0 } };
  }
};
