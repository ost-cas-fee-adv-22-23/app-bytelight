import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { fetchUserById } from '../../services/qwacker';
import {
  CalendarIcon,
  IconLabel,
  Label,
  LocationIcon,
  Paragraph,
  ProfileIcon,
  ProfilePicture,
} from '@smartive-education/design-system-component-library-bytelight';
import Image from 'next/image';

type PageProps = {
  profileUser: {
    user: {
      id: string;
      userName: string;
      firstName: string;
      lastName: string;
      avatarUrl: string;
      location?: string;
      userSince?: string;
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
      <div className="flex bg-slate-100 w-full h-screen p-xl justify-center">
        <div className="w-[615px] h-[650px] rounded-2xl">
          <div className="flex relative mt-s">
            <Image
              src="https://wallpaperaccess.com/full/2222765.jpg"
              width={'100'}
              height={'100'}
              // eslint-disable-next-line react/forbid-component-props
              className="rounded-xl w-full h-full"
              alt="dt"
            />
            <div className="absolute mt-[260px] ml-[420px]">
              <ProfilePicture
                size="XL"
                src="https://qph.cf2.quoracdn.net/main-qimg-e43af1ea0978af7da031068531f8967b-lq"
                alt="profile-Picture"
              />
            </div>
          </div>
          <div className="mt-m">
            <Label variant="XL">
              {profileData.firstName} {profileData.lastName}
            </Label>
            <div className="flex gap-x-s mb-s">
              <IconLabel variant="violet" value={profileData.userName} icon={<ProfileIcon size="12" />} />
              {profileData.location && <IconLabel variant="gray" value="Foosha Village" icon={<LocationIcon size="12" />} />}
              {profileData.userSince && (
                <IconLabel variant="gray" value="Mitglied seit 18 Jahren" icon={<CalendarIcon size="12" />} />
              )}
            </div>
          </div>
          <Paragraph fontSize="M">
            Paragraph – Quia aut et aut. Sunt et eligendi similique enim qui quo minus. Aut aut error velit voluptatum optio
            sed quis cumque error magni. Deserunt pariatur molestiae incidunt. Omnis deserunt ratione et recusandae quos
            excepturi ut deleniti ut repellat magni.
          </Paragraph>
          <h1>Posts:</h1>
        </div>
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
