import { QwackerUserResponse } from '../services/qwacker';

export type MumbleWithReplies = {
  createdTimestamp: number;
  creator: string;
  id: string;
  likeCount: number;
  likedByUser: boolean;
  mediaType?: string;
  mediaUrl?: string;
  profile: {
    user: { avatarUrl?: string; firstName: string; lastName: string; id: string; userName: string };
  };
  replyCount: number;
  text: string;
  type: string;
  replies: {
    creator: string;
    id: string;
    likeCount: number;
    likedByUser: boolean;
    mediaType?: string;
    mediaUrl?: string;
    parentId: string;
    text: string;
    type: string;
  }[];
};

export type LikedPosts = {
  count: number;
  data: LikedPost[];
};

export type LikedPost = {
  id: string;
  creator: string;
  text: string;
  mediaUrl?: string;
  mediaType?: string;
  likeCount: number;
  likedByUser: boolean;
  type: string;
  replyCount: number;
  createdTimestamp: number;
};

export type LikedPostsWithUser = LikedPostWithUser[];

export type LikedPostWithUser = {
  profile: {
    user: QwackerUserResponse;
  };
  createdTimestamp: number;
  id: string;
  creator: string;
  text: string;
  mediaUrl?: string | undefined;
  mediaType?: string | undefined;
  likeCount: number;
  likedByUser: boolean;
  type: string;
  replyCount: number;
};
