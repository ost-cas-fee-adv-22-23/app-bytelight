import { decodeTime } from 'ulid';
import { LikedPost } from '../models/mumble';
import { RawMumble, fetchUserById } from '../services/qwacker';

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
