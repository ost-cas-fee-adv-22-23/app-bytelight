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

const getHeaders = (accessToken: string | undefined) => {
  const headers = { 'content-type': 'application/json', Authorization: `Bearer ${accessToken}` };
  return headers;
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

  const response = await fetch(url, {
    headers: getHeaders(accessToken),
  });

  const { count, data } = (await response.json()) as QwackerMumbleResponse;
  const mumbles = await Promise.all(data.map(async (mumble) => await transformMumble(mumble, accessToken)));

  return {
    count,
    mumbles,
  };
};

//get User
export const fetchUserById = async ({ id, accessToken }: { id: string; accessToken?: string }) => {
  const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/users/${id}`;

  const response = await fetch(url, {
    headers: getHeaders(accessToken),
  });

  const user = (await response.json()) as QwackerUserResponse;

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

  const response = await fetch(url, {
    headers: getHeaders(accessToken),
  });

  const mumble = (await response.json()) as Mumble;

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

  const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts`;
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return transformMumble(await response.json());
};

export const getPostsByUser = async (creatorId: string, accessToken?: string) => {
  const { mumbles } = await fetchMumbles({
    accessToken,
  });

  return mumbles.filter((mumble) => mumble.creator === creatorId);
};

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
    headers: getHeaders(accessToken),
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
    headers: getHeaders(accessToken),
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
export const updatePostLike = async (action: 'like' | 'unlike', mumbleId: string, accessToken?: string) => {
  if (!accessToken) {
    throw new Error('No access token');
  }

  if (!mumbleId) {
    throw new Error('No Mumble ID available');
  }

  const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts/${mumbleId}/likes`;

  const response = await fetch(url, {
    method: action === 'like' ? 'PUT' : 'DELETE',
    headers: getHeaders(accessToken),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};
