import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { useState } from 'react';
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
    <div className="w-60 m-auto my-10">
      <h2 className="text-lg">{count} mumbles</h2>
      <ul>
        {mumbles.map((mumble) => (
          <li key={mumble.id} className="bg-gray-100 rounded px-4 py-2 mt-2">
            <p className="text-sm">
              {mumble.text} ({mumble.createdTimestamp})
            </p>
            {mumble.mediaUrl && (
              <figure className="relative block max-w-full h-64 my-2">
                {/* eslint-disable-next-line react/forbid-component-props */}
                <Image src={mumble.mediaUrl} alt={mumble.text} fill style={{ objectFit: 'cover' }} />
              </figure>
            )}
          </li>
        ))}
      </ul>
      {hasMore ? (
        <button onClick={() => loadMore()} disabled={loading} className="bg-indigo-400 px-2 py-1 rounded-lg mt-4">
          {loading ? '...' : 'Load more'}
        </button>
      ) : (
        ''
      )}
    </div>
  );
}
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  try {
    const { count, mumbles } = await fetchMumbles({ limit: 1 });

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
