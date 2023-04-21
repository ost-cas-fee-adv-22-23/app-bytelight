import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { getToken } from 'next-auth/jwt';
import Head from 'next/head';
import { MumbleDetailView } from '../../components/mumble-detail-view';
import { getPostWithReplies } from '../../services/qwacker';

const MumblePage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ postWithReplies }) => {
  return (
    <>
      <Head>
        <title>Detail View</title>
      </Head>

      <div className=" bg-slate-100 h-screen w-screen">
        <div className="flex justify-center pt-xl">
          <MumbleDetailView postWithReplies={postWithReplies} />
        </div>
      </div>
    </>
  );
};

export default MumblePage;

export const getServerSideProps = async ({ req, query }: GetServerSidePropsContext) => {
  const token = await getToken({ req });

  if (!token) {
    throw Error('no token');
  }

  const id = query.id;

  try {
    const postWithReplies = await getPostWithReplies(id as string, token.accessToken);

    return { props: { postWithReplies } };
  } catch (error) {
    console.log('error');
  }
};
