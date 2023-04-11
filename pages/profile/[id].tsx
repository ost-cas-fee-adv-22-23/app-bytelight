import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { fetchUserById } from '../../services/qwacker';

type PageProps = {
  profileUser: {
    user: {
      id: string;
      userName: string;
      lastName: string;
      avatarUrl: string;
    };
  };
  error?: string;
};

export default function ProfilePage({ profileUser, error }: PageProps) {
  console.log(profileUser);
  const profileData = profileUser.user;

  if (error) {
    return <div>An error occurred: {error}</div>;
  }

  return (
    <>
      <div>
        <div>UserName: </div>
        <div>{profileData.userName}</div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { id } = context.query;
  const token = await getToken({ req: context.req });

  if (!token) {
    throw Error('no token');
  }

  if (!id) {
    throw Error('no id');
  }

  if (typeof id !== 'string') {
    throw Error('no id');
  }

  try {
    const profileUser = await fetchUserById({ id: id, accessToken: token.accessToken as string });

    return { props: { profileUser } };
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }

    return {
      props: {
        error: message,
        profileUser: { user: { id: '1', firstName: 'max', lastName: 'fa', userName: 'jf', avatarUrl: 'sdf' } },
      },
    };
  }
};
