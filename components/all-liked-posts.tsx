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
import { FC, useEffect, useState } from 'react';
import { fallBackImgUrl, getCurrentUrl, getTimeSince, handleLikes, url } from '../helper';
import { LikedPostWithUser } from '../models/mumble';
import { ErrorMessage } from './error-message';

type Props = {
  likedPost: LikedPostWithUser;
};

export const AllLikedPosts: FC<Props> = ({ likedPost }) => {
  const [isLiked] = useState(likedPost.likedByUser);
  const [error, setError] = useState(false);
  const [datePrint, setDatePrint] = useState<string>();
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.accessToken;

  useEffect(() => {
    setDatePrint(getTimeSince(new Date(likedPost.createdTimestamp ?? '1111')));
  }, [likedPost]);

  return (
    <>
      <div className="bg-white  px-xl py-8 rounded-2xl relative">
        <div className="flex mb-s">
          <div className="absolute -left-8 top-5 hover:scale-105 transition ease-in-out md:block hidden">
            <Link href={`/profile/${likedPost.creator}`}>
              <ProfilePicture
                size="M"
                src={likedPost.profile.user.avatarUrl ? likedPost.profile.user.avatarUrl : fallBackImgUrl}
                alt="profile-picture"
              />
            </Link>
          </div>
          <div>
            <Label variant="M">{`${likedPost.profile.user.firstName} ${likedPost.profile.user.lastName}`}</Label>
            <div className="flex gap-x-s">
              <Link href={`/profile/${likedPost.creator}`}>
                <IconLabel variant="violet" value={likedPost.profile.user.userName} icon={<ProfileIcon size="12" />} />
              </Link>
              <Link href={`/mumble/${likedPost.id}`}>
                <IconLabel variant="gray" value={datePrint ?? 'no date'} icon={<ClockIcon size="12" />} />
              </Link>
            </div>
          </div>
        </div>
        <Paragraph fontSize="M">{likedPost.text}</Paragraph>
        {likedPost.mediaUrl && (
          <div className="flex mt-s">
            {/* eslint-disable-next-line react/forbid-component-props */}
            <Image
              width={100}
              height={100}
              src={likedPost.mediaUrl}
              // eslint-disable-next-line react/forbid-component-props
              className="rounded-xl w-full h-full"
              alt="pic profile"
            />
          </div>
        )}
        {error && <ErrorMessage text="Something went wrong" />}
        <div className="flex justify-start gap-x-l mt-s">
          <CommentAction
            onClick={() => router.push(`/mumble/${likedPost.id}`)}
            label={`${likedPost.replyCount} Coms`}
            icon={likedPost.replyCount === 0 ? <CommentEmptyIcon size="16px" /> : <CommentFilledIcon size="16px" />}
            count={likedPost.replyCount}
            // eslint-disable-next-line react/forbid-component-props
            className={''}
          />
          <LikeAction
            hasMyLike={likedPost.likedByUser}
            count={likedPost.likeCount}
            onClick={() => handleLikes(isLiked, likedPost.id, token, setError)}
          />
          <ShareButton
            label="Copy Link"
            labelTransition="Copied!"
            link={
              `${getCurrentUrl(url)?.includes(`/profile/${likedPost.profile.user.id}`)}` &&
              `${getCurrentUrl(url)?.replace(`/profile/${likedPost.profile.user.id}`, `/mumble/${likedPost.id}`)}`
            }
          />
        </div>
      </div>
    </>
  );
};
