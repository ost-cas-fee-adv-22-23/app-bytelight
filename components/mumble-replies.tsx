import {
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
import { FC, useState } from 'react';
import { fallBackImgUrl, getCurrentUrl, handleLikes, url } from '../helper';
import { useAsyncEffect } from '../hooks/use-async-effect-hook';
import { MumbleReply, QwackerUserResponse, fetchUserById } from '../services/qwacker';
import { ErrorMessage } from './error-message';
import { LoadingSpinner } from './loading-spinner';

type Props = {
  reply: MumbleReply;
};

export const MumbleReplies: FC<Props> = ({ reply }) => {
  const { data: session } = useSession();
  const [responder, setResponder] = useState<QwackerUserResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiked] = useState(reply.likedByUser);
  const [error, setError] = useState(false);
  const token = session?.accessToken;

  useAsyncEffect(async () => {
    setIsLoading(true);
    const userData = await fetchUserById({ id: reply.creator, accessToken: token });
    setResponder(userData.user);
    setIsLoading(false);
  }, [reply.creator]);

  if (isLoading) {
    return <LoadingSpinner imageWidth={100} />;
  }

  if (!isLoading && !responder) {
    return <ErrorMessage text="No Comments" />;
  }

  return (
    <div className="flex flex-col mt-m border-b-4 border-slate-100">
      {responder ? (
        <div className="flex mb-s">
          <div className="hover:scale-105 transition ease-in-out">
            <Link href={`/profile/${responder.id}`}>
              <ProfilePicture
                size="S"
                src={responder.avatarUrl ? responder.avatarUrl : fallBackImgUrl}
                alt="profile-Picture"
              />
            </Link>
          </div>
          <div className="ml-xs">
            <Label variant="M">{`${responder.firstName} ${responder.lastName}`}</Label>
            <div className="flex gap-x-s">
              <Link href={`/profile/${responder.id}`}>
                <IconLabel variant="violet" value={responder.userName} icon={<ProfileIcon size="12" />} />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>there are no Repliers</div>
      )}

      <Paragraph fontSize="M">{reply.text}</Paragraph>
      {reply.mediaUrl && (
        <div className="flex mt-s">
          {/* eslint-disable-next-line react/forbid-component-props */}
          <Image width={100} height={100} src={reply.mediaUrl} className="rounded-xl w-full h-full" alt="pic profile" />
        </div>
      )}
      {error && <ErrorMessage text="Something went wrong" />}
      <div className="flex justify-start gap-x-l my-s">
        <LikeAction
          hasMyLike={reply.likeCount > 0}
          count={reply.likeCount}
          onClick={() => handleLikes(isLiked, reply.id, token, setError)}
        />
        <ShareButton label="Copy Link" labelTransition="Copied!" link={`${getCurrentUrl(url)}`} />
      </div>
    </div>
  );
};
