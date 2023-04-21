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
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { fallBackImgUrl, handleLikes } from '../helper';
import { Mumble } from '../services/qwacker';
import { ErrorMessage } from './error-message';

export type Props = {
  post: Mumble;
};

export const MumblePost: FC<Props> = ({ post }) => {
  const [isLiked] = useState(post.likedByUser);
  const [error, setError] = useState(false);
  const dateFormat = new Date(post.createdTimestamp ?? '1111');
  const datePrint = dateFormat.getHours() + ':' + dateFormat.getMinutes() + ', ' + dateFormat.toDateString();
  const { data: session } = useSession();
  const router = useRouter();
  const token = session?.accessToken;

  return (
    <div className="bg-white w-[680px] px-xl py-8 rounded-2xl relative">
      <div className="flex mb-s">
        <div className="absolute -left-8 top-5 hover:scale-105 transition ease-in-out">
          <Link href={`/profile/${post.creator}`}>
            <ProfilePicture
              size="M"
              src={post.profile.user.avatarUrl ? post.profile.user.avatarUrl : fallBackImgUrl}
              alt="profile-picture"
            />
          </Link>
        </div>
        <div>
          <Label variant="M">{`${post.profile.user.firstName} ${post.profile.user.lastName}`}</Label>
          <div className="flex gap-x-s">
            <Link href={`/profile/${post.creator}`}>
              <IconLabel variant="violet" value={post.profile.user.userName} icon={<ProfileIcon size="12" />} />
            </Link>
            <Link href={`/mumble/${post.id}`}>
              <IconLabel variant="gray" value={datePrint} icon={<ClockIcon size="12" />} />
            </Link>
          </div>
        </div>
      </div>
      <Paragraph fontSize="M">{post.text}</Paragraph>
      {post.mediaUrl && (
        <div className="flex mt-s">
          {/* eslint-disable-next-line react/forbid-component-props */}
          <Image width={100} height={100} src={post.mediaUrl} className="rounded-xl w-full h-full" alt="profile picture" />
        </div>
      )}
      {error && <ErrorMessage text="Something went wrong" />}
      <div className="flex justify-start gap-x-l mt-s">
        <CommentAction
          onClick={() => router.push(`/mumble/${post.id}`)}
          label={`${post.replyCount} Coms`}
          icon={post.replyCount === 0 ? <CommentEmptyIcon size="16px" /> : <CommentFilledIcon size="16px" />}
          count={post.replyCount}
          // eslint-disable-next-line react/forbid-component-props
          className={''}
        />
        <LikeAction
          hasMyLike={post.likeCount > 0}
          count={post.likeCount}
          onClick={() => handleLikes(isLiked, post.id, token, setError)}
        />
        <ShareButton label="Copy Link" labelTransition="Copied!" link={`localhost:3000/mumble/${post.id}`} />
      </div>
    </div>
  );
};
