import { SetStateAction } from 'react';
import { decodeTime } from 'ulid';
import { LikedPost } from '../models/mumble';
import { RawMumble, deletePost, fetchUserById, updatePostLike } from '../services/qwacker';

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

export const handleDelete = (
  postId: string,
  token: string | undefined,
  setError: (value: SetStateAction<boolean>) => void
) => {
  try {
    deletePost(postId, token);
  } catch {
    setError(true);
  }
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

export const getTimeSince = (date: Date): string => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  // month
  let interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `vor ${interval} Monaten`;
  }
  if (interval == 1) {
    return `vor einem Monat`;
  }

  // days
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `vor ${interval} Tagen`;
  }
  if (interval == 1) {
    return `vor einem Tag`;
  }

  // houres
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `vor ${interval} Stunden`;
  }
  if (interval == 1) {
    return `vor einer Stunde`;
  }

  // minutes
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `vor ${interval} Minuten`;
  }
  if (interval == 1) {
    return `vor einer Minute`;
  }
  // now
  if (seconds < 10) return 'gerade jetzt';

  //seconds ago
  return `vor ${Math.floor(seconds)} Sekunden`;
};
