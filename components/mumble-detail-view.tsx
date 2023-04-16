import { FC, useState } from 'react';
import { MumbleWithReplies } from '../models/mumble';
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
  ShareButton,
} from '@smartive-education/design-system-component-library-bytelight';
import Link from 'next/link';
import Image from 'next/image';
import { MumbleReplyComments } from './mumble-reply-comments';

type Props = {
  postWithReplies: MumbleWithReplies;
};

export const MumbleDetailView: FC<Props> = ({ postWithReplies }) => {
  const [likes, setLikes] = useState(postWithReplies.likeCount);
  const dateFormat = new Date(postWithReplies.createdTimestamp ?? '1111');
  const datePrint = dateFormat.getHours() + ':' + dateFormat.getMinutes() + ', ' + dateFormat.toDateString();

  return (
    <div className="bg-white w-[680px] px-xl py-8 rounded-2xl relative">
      <div className="flex mb-s">
        <div className="absolute -left-8 top-5">
          <ProfilePicture
            size="M"
            src={
              postWithReplies.profile.user.avatarUrl
                ? postWithReplies.profile.user.avatarUrl
                : 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
            }
            alt="profile-picture"
          />
        </div>
        <div>
          <Label variant="M">{`${postWithReplies.profile.user.firstName} ${postWithReplies.profile.user.lastName}`}</Label>
          <div className="flex gap-x-s">
            <Link href={`/profile/${postWithReplies.creator}`}>
              <IconLabel variant="violet" value={postWithReplies.profile.user.userName} icon={<ProfileIcon size="12" />} />
            </Link>

            <IconLabel variant="gray" value={datePrint} icon={<ClockIcon size="12" />} />
          </div>
        </div>
      </div>
      <Paragraph fontSize="L">{postWithReplies.text}</Paragraph>
      {postWithReplies.mediaUrl && (
        <div className="flex mt-s">
          <Image
            width={100}
            height={100}
            src={postWithReplies.mediaUrl}
            // eslint-disable-next-line react/forbid-component-props
            className="rounded-xl w-full h-full"
            alt="pic profile"
          />
        </div>
      )}
      <div className="flex justify-start gap-x-l mt-s">
        <CommentAction
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
          label={`${postWithReplies.replyCount} Coms`}
          // eslint-disable-next-line react/jsx-no-undef
          icon={postWithReplies.replyCount === 0 ? <CommentEmptyIcon size="16px" /> : <CommentFilledIcon size="16px" />}
          count={postWithReplies.replyCount}
          // eslint-disable-next-line react/forbid-component-props
          className={''}
        />
        <LikeAction
          hasMyLike={postWithReplies.likeCount > 0}
          count={postWithReplies.likeCount}
          onClick={() => {
            if (postWithReplies.likeCount > 0) {
              setLikes(likes - 1);
              return;
            }
            setLikes(likes + 1);
          }}
        />
        <ShareButton label="Copy Link" labelTransition="Copied!" link={postWithReplies.text} />
      </div>
      {postWithReplies.replies.map((reply) => (
        <MumbleReplyComments reply={reply} key={reply.id} />
      ))}
    </div>
  );
};
