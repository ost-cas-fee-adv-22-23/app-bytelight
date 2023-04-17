import { FC } from 'react';
import { LikedPostsWithUser } from '../models/mumble';

type Props = {
  likedPosts: LikedPostsWithUser;
};

export const AllLikedPosts: FC<Props> = ({ likedPosts }) => {
  return (
    <div>
      {likedPosts.map((post) => (
        <div key={post.id}>{post.id}</div>
      ))}
    </div>
  );
};
