import { Button } from '@smartive-education/design-system-component-library-bytelight';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getToken } from 'next-auth/jwt';
import { useState } from 'react';
import { MumbelPost } from '../components/mumbel-post';
import { fetchMumbles, Mumble } from '../services/qwacker';

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

  if (error) {
    return <div>An error occurred: {error}</div>;
  }

  const loadMore = async () => {
    const { count, mumbles: newMumbles } = await fetchMumbles({
      limit: 1,
      offset: mumbles.length,
    });

    setLoading(false);
    setHasMore(mumbles.length + newMumbles.length < count);
    setMumbles([...mumbles, ...newMumbles]);
  };
  return (
    <>
      <ul>
        {mumbles.map((mumble) => (
          <li key={mumble.id}>
            <MumbelPost post={mumble} />
          </li>
        ))}
      </ul>
      {hasMore ? (
        <div className="inline-flex">
          <Button onClick={() => loadMore()} as="button">
            {loading ? '...' : 'Load more'}
          </Button>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
export const getServerSideProps: GetServerSideProps<PageProps> = async ({ req }) => {
  const token = await getToken({ req });

  if (!token) {
    throw Error('no token');
  }

  try {
    const { count, mumbles } = await fetchMumbles({ limit: 1, accessToken: token.accessToken as string });

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
