import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { getToken } from 'next-auth/jwt';
import { MumbelPost } from '../../components/mumbel-post';
import { getMumbleById } from '../../services/qwacker';

const MumblePage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ mumbleById }) => {
  return (
    <div className="bg-[#F1F5F9] w-screen h-screen">
      <MumbelPost post={mumbleById} />
    </div>
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
    const mumbleById = await getMumbleById(id as string, token.accessToken);

    return { props: { mumbleById } };
  } catch (error) {
    console.log('error');
  }
};
