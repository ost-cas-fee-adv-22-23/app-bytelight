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
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { fallBackImgUrl } from '../helper';
import { LikedPostWithUser } from '../models/mumble';

type Props = {
  likedPost: LikedPostWithUser;
};

export const AllLikedPosts: FC<Props> = ({ likedPost }) => {
  const [likes, setLikes] = useState(likedPost.likeCount);
  const dateFormat = new Date(likedPost.createdTimestamp ?? '1111');
  const datePrint = dateFormat.getHours() + ':' + dateFormat.getMinutes() + ', ' + dateFormat.toDateString();

  return (
    <div>
      <>
        <div className="bg-white w-[680px] px-xl py-8 rounded-2xl relative my-4">
          <div className="flex mb-s">
            <div className="absolute -left-8 top-5 hover:scale-105 transition ease-in-out">
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
                  <IconLabel variant="gray" value={datePrint} icon={<ClockIcon size="12" />} />
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
          <div className="flex justify-start gap-x-l mt-s">
            <CommentAction
              onClick={function (): void {
                throw new Error('Function not implemented.');
              }}
              label={`${likedPost.replyCount} Coms`}
              icon={likedPost.replyCount === 0 ? <CommentEmptyIcon size="16px" /> : <CommentFilledIcon size="16px" />}
              count={likedPost.replyCount}
              // eslint-disable-next-line react/forbid-component-props
              className={''}
            />
            <LikeAction
              hasMyLike={likedPost.likeCount > 0}
              count={likedPost.likeCount}
              onClick={() => {
                if (likedPost.likeCount > 0) {
                  setLikes(likes - 1);
                  return;
                }
                setLikes(likes + 1);
              }}
            />
            <ShareButton label="Copy Link" labelTransition="Copied!" link={`localhost:3000/mumble/${likedPost.id}`} />
          </div>
        </div>
      </>
    </div>
  );
};
