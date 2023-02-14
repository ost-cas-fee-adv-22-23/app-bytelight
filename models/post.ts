import { Creator } from './creator';

export type Post = {
  id: string;
  creator: Creator;
  text: string;
  mediaUrl: string;
  mediaType: string;
  likeCount: number;
  likedByUser: boolean;
  type: string;
  replyCount: number;
};
