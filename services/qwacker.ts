import { decodeTime } from 'ulid';

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
  accessToken?: string;
}) => {
  const { limit, offset, newerThanMumbleId, accessToken } = params || {};
  const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts?${new URLSearchParams({
    limit: limit?.toString() || '10',
    offset: offset?.toString() || '0',
    newerThan: newerThanMumbleId || '',
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

export const getMumbleById = async (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_QWACKER_API_URL}/posts/${id}`;

  const response = await fetch(url, {
    headers: {
      'content-type': 'application/json',
    },
  });
  const mumble = (await response.json()) as RawMumble;
  return mumble;
};
