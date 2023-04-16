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
