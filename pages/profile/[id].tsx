import {
  CalendarIcon,
  IconLabel,
  Label,
  LocationIcon,
  Paragraph,
  ProfileIcon,
  ProfilePicture,
} from '@smartive-education/design-system-component-library-bytelight';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MumblePost } from '../../components/mumble-post';
import { Mumble, fetchUserById, getPostsByUser } from '../../services/qwacker';

type PageProps = {
  profileUser?: {
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
// präsi: limitoffset here für loadmore anderst also bei feed
export default function ProfilePage({ profileUser, error }: PageProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userPosts, setUserPosts] = useState<Mumble[]>();

  //PRäsi useEffect als hook asyncEffectHook direkt async funktionen bruachen
  useEffect(() => {
    setUserPosts([]);
    setIsLoading(true);

    const asyncFunc = async () => {
      const myData = async () => {
        const posts = await getPostsByUser(profileData.id, session?.accessToken);
        return posts;
      };
      try {
        const data = await myData();
        console.log('DATA:', data);
        setUserPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    asyncFunc();
    //TODO: profileData.id needs to be added here in deps
  }, [session?.accessToken]);

  if (!profileUser) {
    return <div>Fucked</div>;
  }

  const profileData = profileUser.user;

  if (error) {
    return <div>An error occurred: {error}</div>;
  }

  // const useAsyncHook = (cb: <Promise>() => void, deps: []) => {
  //   useEffect(() => {
  //     cb;
  //   }, [deps]);
  // };

  return (
    <>
      <div className="flex bg-slate-100 w-full min-h-screen p-xl justify-center">
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
                src={
                  profileUser?.user.avatarUrl ??
                  'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
                }
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
          <h1 className="mt-10 mb-4">Posts:</h1>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : userPosts ? (
            <ul className="flex flex-col gap-y-s">
              {userPosts.map((post) => (
                <li key={post.id}>
                  <MumblePost post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <h1>No Posts</h1>
          )}
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
      },
    };
  }
};
