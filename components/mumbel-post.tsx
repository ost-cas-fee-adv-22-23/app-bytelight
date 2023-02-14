import {
  ClockIcon,
  CommentAction,
  CommentEmptyIcon,
  CommentFilledIcon,
  IconLabel,
  Label,
  LikeAction,
  Paragraph,
  ProfileIcon,
  ProfilePicture,
} from '@smartive-education/design-system-component-library-bytelight';
import { FC, useState } from 'react';
import { Post } from '../models/post';
import Image from 'next/image';

export type Props = {
  post: Post;
};

export const MumbelPost: FC<Props> = ({ post }) => {
  const [likes, setLikes] = useState(post.likeCount);

  return (
    <div className="bg-slate-100 w-full h-full p-l flex justify-center">
      <div className=" bg-white w-[615px] p-xl rounded-2xl">
        <div className="flex mb-s">
          <ProfilePicture size="S" src={post.creator.avatarUrl} alt="profile-Picture" />
          <div className="ml-xs">
            <Label variant="M">{post.creator.userName}</Label>
            <div className="flex gap-x-s">
              <IconLabel variant="violet" value="BaumG" icon={<ProfileIcon size="12" />} />
              <IconLabel variant="gray" value={'Today'} icon={<ClockIcon size="12" />} />
            </div>
          </div>
        </div>
        <Paragraph fontSize="M">{post.text}</Paragraph>
        {post.mediaUrl && (
          <div className="flex mt-s">
            {/* eslint-disable-next-line react/forbid-component-props */}
            <Image width={100} height={100} src={post.mediaUrl} className="rounded-xl w-full h-full" alt="pic profile" />
          </div>
        )}

        <div className="flex justify-start gap-x-l mt-s">
          <LikeAction
            hasMyLike={post.likeCount > 0}
            count={post.likeCount}
            onClick={() => {
              if (post.likeCount > 0) {
                setLikes(likes - 1);
                return;
              }
              setLikes(likes + 1);
            }}
          />
          <CommentAction
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
            label={`${post.replyCount} Coms`}
            icon={post.replyCount === 0 ? <CommentEmptyIcon size="16px" /> : <CommentFilledIcon size="16px" />}
            count={post.replyCount}
            // eslint-disable-next-line react/forbid-component-props
            className={''}
          />
        </div>
      </div>
    </div>
  );
};
