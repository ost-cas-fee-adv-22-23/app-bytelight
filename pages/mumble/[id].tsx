import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { MumbelPost } from '../../components/mumbel-post';
import { getMumbleById, RawMumble } from '../../services/qwacker';

interface Params extends ParsedUrlQuery {
  id: string;
}

type PageProps = {
  mumbles: RawMumble;
};

export default function MumblePage({ mumbles }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <MumbelPost post={mumbles} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps, Params> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { id } = params;
  const mumbles = await getMumbleById(id);
  return {
    props: {
      mumbles,
    },
  };
};
