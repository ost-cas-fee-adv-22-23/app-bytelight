import {
  ClockIcon,
  IconLabel,
  Label,
  LikeAction,
  Paragraph,
  ProfileIcon,
  ProfilePicture,
  ShareButton,
} from '@smartive-education/design-system-component-library-bytelight';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { fallBackImgUrl, getCurrentUrl, getTimeSince, handleLikes, url } from '../helper';
import { MumbleWithReplies } from '../models/mumble';
import { ErrorMessage } from './error-message';
import { MumbleReplies } from './mumble-replies';
import { ReplyTextarea } from './reply-textarea';

type Props = {
  postWithReplies: MumbleWithReplies;
};

export const MumblePostExtended: FC<Props> = ({ postWithReplies }) => {
  const [datePrint, setDatePrint] = useState<string>('no date');
  const [isLiked] = useState(postWithReplies.likedByUser);
  const [error, setError] = useState(false);
  const { data: session } = useSession();
  const token = session?.accessToken;

  useEffect(() => {
    setDatePrint(getTimeSince(new Date(postWithReplies.createdTimestamp)));
  }, [postWithReplies]);

  return (
    <div className="bg-white w-[480px] md:w-[680px] px-xl py-8 rounded-2xl relative">
      <div className="flex mb-s">
        <div className="absolute -left-8 top-5 hover:scale-105 transition ease-in-out hidden md:block">
          <Link href={`/profile/${postWithReplies.creator}`}>
            <ProfilePicture
              size="M"
              src={postWithReplies.profile.user.avatarUrl ? postWithReplies.profile.user.avatarUrl : fallBackImgUrl}
              alt="profile picture"
            />
          </Link>
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
            alt="profile picture"
          />
        </div>
      )}
      {error && <ErrorMessage text="Something went wrong" />}
      <div className="flex justify-start gap-x-l mt-s">
        <LikeAction
          hasMyLike={postWithReplies.likedByUser}
          count={postWithReplies.likeCount}
          onClick={() => handleLikes(isLiked, postWithReplies.id, token, setError)}
        />
        <ShareButton label="Copy Link" labelTransition="Copied!" link={`${getCurrentUrl(url)}`} />
      </div>
      <ReplyTextarea postId={postWithReplies.id} />
      {postWithReplies.replies.map((reply) => (
        <MumbleReplies reply={reply} key={reply.id} />
      ))}
    </div>
  );
};
