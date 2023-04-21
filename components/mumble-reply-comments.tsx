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
import { fallBackImgUrl } from '../helper';
import { useAsyncEffect } from '../hooks/use-async-effect-hook';
import { MumbleReply, QwackerUserResponse, fetchUserById } from '../services/qwacker';
import { ErrorMessage } from './error-message';
import { LoadingSpinner } from './loading-spinner';

type Props = {
  reply: MumbleReply;
};

export const MumbleReplyComments: FC<Props> = ({ reply }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(reply.likeCount);
  const [replyer, setReplayer] = useState<QwackerUserResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const token = session?.accessToken;

  useAsyncEffect(async () => {
    setIsLoading(true);
    const userData = await fetchUserById({ id: reply.creator, accessToken: token });
    setReplayer(userData.user);
    setIsLoading(false);
  }, [reply.creator]);

  if (isLoading) {
    return <LoadingSpinner imageWidth={100} />;
  }

  if (!isLoading && !replyer) {
    return <ErrorMessage text="No Comments with Repliers" />;
  }

  return (
    <div className="flex flex-col mt-14 border-b-4 border-slate-100">
      {replyer ? (
        <div className="flex mb-s">
          <ProfilePicture size="S" src={replyer.avatarUrl ? replyer.avatarUrl : fallBackImgUrl} alt="profile-Picture" />
          <div className="ml-xs">
            <Label variant="M">{`${replyer.firstName} ${replyer.lastName}`}</Label>
            <div className="flex gap-x-s">
              <Link href={`/profile/${replyer.id}`}>
                <IconLabel variant="violet" value={replyer.userName} icon={<ProfileIcon size="12" />} />
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
      <div className="flex justify-start gap-x-l mt-s">
        <LikeAction
          hasMyLike={reply.likeCount > 0}
          count={reply.likeCount}
          onClick={() => {
            if (reply.likeCount > 0) {
              setLikes(likes - 1);
              return;
            }
            setLikes(likes + 1);
          }}
        />
        <ShareButton label="Copy Link" labelTransition="Copied!" link={reply.text} />
      </div>
    </div>
  );
};
