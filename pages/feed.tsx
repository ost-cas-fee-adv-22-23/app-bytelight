import { Button, Heading2, Heading4, MumbleIcon } from '@smartive-education/design-system-component-library-bytelight';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getToken } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
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
  const { data: session } = useSession();

  if (error) {
    return <div>An error occurred: {error}</div>;
  }

  const loadMore = async () => {
    const { count, mumbles: oldMumbles } = await fetchMumbles({
      limit: 10,
      olderThanMumbleId: mumbles[mumbles.length - 1].id,
      accessToken: session?.accessToken,
    });

    setLoading(false);
    setHasMore(mumbles.length + oldMumbles.length < count);
    setMumbles([...mumbles, ...oldMumbles]);
  };

  const loadNew = async () => {
    const { count, mumbles: newMumbles } = await fetchMumbles({
      limit: 10,
      newerThanMumbleId: mumbles[0].id,
      accessToken: session?.accessToken,
    });

    if (count > 0) {
      setLoading(false);
      setMumbles([...newMumbles, ...mumbles]);
    } else {
      alert('No new Mumbles');
    }
  };

  return (
    <div className="bg-slate-100 flex flex-col items-center w-screen">
      <div className="flex flex-col justify-center w-[680px] mt-8 [&>h2]:text-violet-600 [&>h4]:text-slate-500 gap-y-xs">
        <Heading2>Willkommen auf Mumble</Heading2>
        <Heading4>Voluptatem qui cumque voluptatem quia tempora dolores distinctio vel repellat dicta.</Heading4>
        <Button onClick={() => loadNew()} as="button">
          <div className="flex items-center justify-between">
            {loading ? <LoadingSpinner imageWidth={100} /> : 'Get newest Mumbles'}
            <MumbleIcon size="16" />
          </div>
        </Button>
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
  );
}
export const getServerSideProps: GetServerSideProps<PageProps> = async ({ req }) => {
  const token = await getToken({ req });

  if (!token) {
    throw Error('no token');
  }

  try {
    const { count, mumbles } = await fetchMumbles({ limit: 10, accessToken: token.accessToken as string });

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
