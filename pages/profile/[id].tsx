import {
  IconLabel,
  Label,
  Paragraph,
  ProfileIcon,
  ProfilePicture,
  Switch,
} from '@smartive-education/design-system-component-library-bytelight';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { AllLikedPosts } from '../../components/all-liked-posts';
import { AllUserPosts } from '../../components/all-user-posts';
import { ErrorMessage } from '../../components/error-message';
import { useAsyncEffect } from '../../hooks/use-async-effect-hook';
import { LikedPostsWithUser } from '../../models/mumble';
import { Mumble, fetchUserById, getPostsByUser, getPostsThatAreLikedByUser } from '../../services/qwacker';

type PageProps = {
  profileUser?: {
    user: {
      id: string;
      userName: string;
      firstName: string;
      lastName: string;
      avatarUrl: string;
    };
  };
  error?: string;
  likedPosts?: LikedPostsWithUser;
};

export default function ProfilePage({ profileUser, error, likedPosts }: PageProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userPosts, setUserPosts] = useState<Mumble[]>();
  const [viewSwitch, setViewSwitch] = useState(true);
  const profileData = profileUser?.user;

  useAsyncEffect(async () => {
    setUserPosts([]);
    setIsLoading(true);
    if (error || !profileData) return;
    try {
      const posts = await getPostsByUser(profileData.id, session?.accessToken);
      setUserPosts(posts);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [profileData, session?.accessToken, error]);

  if (!profileUser || error || !profileData) {
    return <ErrorMessage text={error ? error : 'Was not able to fetch user!'} />;
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="bg-slate-100 flex flex-col h-full items-center w-screen">
        <div className="w-[615px] h-full rounded-2xl">
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
                  profileUser.user.avatarUrl
                    ? profileUser.user.avatarUrl
                    : 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
                }
                alt="profile-Picture"
              />
            </div>
          </div>
          <div className="mt-m h-full">
            <Label variant="XL">
              {profileData.firstName} {profileData.lastName}
            </Label>
            <div className="flex gap-x-s mb-s">
              <IconLabel variant="violet" value={profileData.userName} icon={<ProfileIcon size="12" />} />
            </div>
          </div>
          <Paragraph fontSize="M">
            Paragraph – Quia aut et aut. Sunt et eligendi similique enim qui quo minus. Aut aut error velit voluptatum optio
            sed quis cumque error magni. Deserunt pariatur molestiae incidunt. Omnis deserunt ratione et recusandae quos
            excepturi ut deleniti ut repellat magni.
          </Paragraph>

          <div className="my-5">
            <Switch
              onClick={() => setViewSwitch(!viewSwitch)}
              isActive={viewSwitch}
              labelLeft={'Deine Mumbles'}
              labelRight={'Deine Likes'}
            />
          </div>
          {viewSwitch ? (
            <AllUserPosts isLoading={isLoading} userPosts={userPosts} />
          ) : likedPosts && likedPosts?.length > 0 ? (
            likedPosts?.map((post) => <AllLikedPosts key={post.id} likedPost={post} />)
          ) : (
            <ErrorMessage text="User has not liked any posts" />
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
    const likedPosts = await getPostsThatAreLikedByUser(profileUser.user.id, token.accessToken as string);

    return { props: { profileUser, likedPosts } };
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }

    return {
      props: { error: message },
    };
  }
};
