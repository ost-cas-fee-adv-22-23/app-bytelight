import { decodeTime } from 'ulid';
import { LikedPost, LikedPosts, LikedPostsWithUser, MumbleWithReplies } from '../models/mumble';

export type Mumble = {
  id: string;
  creator: string;
  text: string;
  mediaUrl: string;
  mediaType: string;
  likeCount: number;
  likedByUser: boolean;
  profile: {
    user: {
      avatarUrl: string;
      id: string;
      firstName: string;
      lastName: string;
      userName: string;
    };
  };
  type: string;
  replyCount: number;
  createdTimestamp?: number;
};

export type MumbleReply = {
  id: string;
  creator: string;
  text: string;
  mediaUrl?: string;
  mediaType?: string;
  likeCount: number;
  likedByUser: boolean;
  type: string;
  parentId: string;
};

export type RawMumble = Omit<Mumble, 'createdTimestamp'>;

type QwackerMumbleResponse = {
  count: number;
  data: RawMumble[];
};

export type QwackerUserResponse = {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
};

//get Posts
export const fetchMumbles = async (params?: {
  limit?: number;
  offset?: number;
  newerThanMumbleId?: string;
  olderThanMumbleId?: string;
  accessToken?: string;
}) => {
  const { limit, offset, newerThanMumbleId, accessToken, olderThanMumbleId } = params || {};
  const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts?${new URLSearchParams({
    limit: limit?.toString() || '10',
    offset: offset?.toString() || '0',
    newerThan: newerThanMumbleId || '',
    olderThan: olderThanMumbleId || '',
  })}`;

  const res = await fetch(url, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const { count, data } = (await res.json()) as QwackerMumbleResponse;

  const mumbles = await Promise.all(data.map(async (mumble) => await transformMumble(mumble, accessToken)));

  return {
    count,
    mumbles,
  };
};

//get User
export const fetchUserById = async ({ id, accessToken }: { id: string; accessToken?: string }) => {
  const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/users/${id}`;

  const res = await fetch(url, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const user = (await res.json()) as QwackerUserResponse;

  return { user };
};

const transformMumble = async (mumble: RawMumble, accessToken?: string) => {
  return {
    ...mumble,
    profile: await fetchUserById({ id: mumble.creator, accessToken }),
    createdTimestamp: decodeTime(mumble.id),
  };
};

const transformLikedPost = async (post: LikedPost, accessToken?: string) => {
  return {
    ...post,
    profile: await fetchUserById({ id: post.creator, accessToken }),
    createdTimestamp: decodeTime(post.id),
  };
};

export const getMumbleById = async (id: string, accessToken?: string) => {
  const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts/${id}`;

  const res = await fetch(url, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const mumble = (await res.json()) as Mumble;

  return await transformMumble(mumble, accessToken);
};

export const postMumble = async (text: string, file: File | undefined, accessToken?: string) => {
  if (!accessToken) {
    throw new Error('No access token');
  }

  const formData = new FormData();
  formData.append('text', text);
  if (file) {
    formData.append('image', file);
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Something was not okay');
    }

    return transformMumble(await response.json());
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Could not post mumble');
  }
};

export const getPostsByUser = async (creatorId: string, accessToken?: string) => {
  const { mumbles } = await fetchMumbles({
    accessToken,
  });

  return mumbles.filter((mumble) => mumble.creator === creatorId);
};

//Get Posts with all replies
export const getPostWithReplies = async (id: string, accessToken?: string) => {
  if (!accessToken) {
    throw new Error('No access token');
  }
  if (!id) {
    throw new Error('No post ID');
  }

  const post = await getMumbleById(id, accessToken);
  const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts/${id}/replies`;

  const response = await fetch(url, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const replies = (await response.json()) as MumbleReply[];

  return { ...post, replies } as MumbleWithReplies;
};

//Get Posts which the user has liked
export const getPostsThatAreLikedByUser = async (creatorId: string, accessToken?: string) => {
  if (!accessToken) {
    throw new Error('No access token');
  }
  if (!creatorId) {
    throw new Error('No post ID');
  }
  const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts/search`;

  const postData = {
    likedBy: [creatorId],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(postData),
  });

  const data = (await response.json()) as LikedPosts;

  const completePost: LikedPostsWithUser = await Promise.all(
    data.data.map(async (post) => {
      return await transformLikedPost(post, accessToken);
    })
  );

  return completePost;
};
