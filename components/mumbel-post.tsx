import {
  ClockIcon,
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
  console.log('this is a post', post);
  const [likes, setLikes] = useState(post.likeCount);
  const placeholderImage =
    'https://www.travelandleisure.com/thmb/91pb8LbDAUwUN_11wATYjx5oF8Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/new-york-city-evening-NYCTG0221-52492d6ccab44f328a1c89f41ac02aea.jpg';

  return (
    <>
      <div className=" bg-slate-100 w-full h-full p-xl">
        <div className=" bg-white w-[615px] h-[650px] p-xl rounded-2xl">
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
          <div className="flex mt-s">
            <Image
              width={100}
              height={100}
              src={post.mediaUrl ? post.mediaUrl : placeholderImage}
              className="rounded-xl w-full h-full"
              alt="pic profile"
            />
          </div>
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
          </div>
        </div>
      </div>
    </>
  );
};
