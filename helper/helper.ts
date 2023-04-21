import { SetStateAction } from 'react';
import { decodeTime } from 'ulid';
import { LikedPost } from '../models/mumble';
import { RawMumble, fetchUserById, updatePostLike } from '../services/qwacker';

export const getHeaders = (accessToken: string | undefined) => {
  const headers = { 'content-type': 'application/json', Authorization: `Bearer ${accessToken}` };
  return headers;
};

export const transformMumble = async (mumble: RawMumble, accessToken?: string) => {
  return {
    ...mumble,
    profile: await fetchUserById({ id: mumble.creator, accessToken }),
    createdTimestamp: decodeTime(mumble.id),
  };
};

export const transformLikedPost = async (post: LikedPost, accessToken?: string) => {
  return {
    ...post,
    profile: await fetchUserById({ id: post.creator, accessToken }),
    createdTimestamp: decodeTime(post.id),
  };
};

export const handleLikes = (
  isLiked: boolean,
  postId: string,
  token: string | undefined,
  setError: (value: SetStateAction<boolean>) => void
) => {
  try {
    updatePostLike(isLiked ? 'unlike' : 'like', postId, token);
    window.location.reload();
  } catch {
    setError(true);
  }
};
