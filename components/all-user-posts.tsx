import { FC } from 'react';
import { Mumble } from '../services/qwacker';
import { ErrorMessage } from './error-message';
import { LoadingSpinner } from './loading-spinner';
import { MumblePost } from './mumble-post';

type Props = {
  isLoading: boolean;
  userPosts: Mumble[] | undefined;
};

export const AllUserPosts: FC<Props> = ({ isLoading, userPosts }) => {
  return (
    <>
      {isLoading ? (
        <LoadingSpinner imageWidth={100} />
      ) : userPosts && userPosts.length > 0 ? (
        <ul className="flex flex-col gap-y-s">
          {userPosts.map((post) => (
            <li key={post.id}>
              <MumblePost post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <ErrorMessage text="This user has no posts!" />
      )}
    </>
  );
};
