import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { getToken } from 'next-auth/jwt';
import Head from 'next/head';
import { Fullscreen } from '../../components/full-screen';
import { MumblePostExtended } from '../../components/mumble-post-extended';
import { getPostWithReplies } from '../../services/qwacker';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

const MumblePage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ postWithReplies }) => {
  return (
    <Fullscreen>
      <Head>
        <title>Detail View</title>
      </Head>
      <div className="flex justify-center ">
        <MumblePostExtended postWithReplies={postWithReplies} />
      </div>
    </Fullscreen>
  );
};

export default MumblePage;

export const getServerSideProps = async ({ req, res, query }: GetServerSidePropsContext) => {
  const token = await getToken({ req });
  const session = await getServerSession(req, res, authOptions);

  if (!token) {
    throw Error('no token');
  }

  const id = query.id;

  try {
    const postWithReplies = await getPostWithReplies(id as string, token.accessToken);

    return { props: { postWithReplies, session } };
  } catch (error) {
    console.log('error');
    throw error;
  }
};
