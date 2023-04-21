import {
  Button,
  ButtonRound,
  CancelIcon,
  IconLabel,
  Label,
  ProfileIcon,
  ProfilePicture,
  SendIcon,
  Textarea,
  UploadIcon,
} from '@smartive-education/design-system-component-library-bytelight';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ChangeEvent, FC, useState } from 'react';
import { fallBackImgUrl } from '../helper';
import { postComment } from '../services/qwacker';
import { ErrorMessage } from './error-message';
import { UploadModal } from './upload-modal';

type Props = {
  postId: string;
};

export const ReplyTextarea: FC<Props> = ({ postId }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasFile, setHasFile] = useState<File | undefined>();
  const [hasPreview, setHasPreview] = useState<string | undefined>('');
  const [error, setError] = useState(false);
  const { data: session } = useSession();
  const token = session?.accessToken;
  const avatarUrl = session?.user.avatarUrl;

  const handleSubmit = async () => {
    try {
      const response = await postComment(postId, inputValue, hasFile, token);
      window.location.reload();
      return response;
    } catch {
      setError(true);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setHasFile(e.target.files[0]);
      setHasPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCancel = () => {
    setHasFile(undefined);
    setHasPreview(undefined);
    setIsOpen(false);
  };

  return (
    <>
      <div className=" bg-white  py-l rounded-2xl ">
        <div className="flex items-center gap-xs mb-s">
          <span className="hover:scale-105 transition ease-in-out">
            <Link href={`/profile/${session?.user.id}`}>
              <ProfilePicture size="S" src={avatarUrl ?? fallBackImgUrl} alt="profile-picture" />
            </Link>
          </span>
          <div className="flex flex-col">
            <Label variant="S">{session?.user.firstname}</Label>
            <Link href={`/profile/${session?.user.id}`}>
              <IconLabel variant="violet" value={session?.user.username ?? ''} icon={<ProfileIcon size="12" />} />
            </Link>
          </div>
        </div>
        <div></div>
        <div className=" flex w-full justify-between">
          {hasPreview && (
            <div>
              <ButtonRound
                onClick={() => {
                  setHasPreview(undefined);
                  setHasFile(undefined);
                  setInputValue('');
                }}
              >
                <CancelIcon size="16" />
              </ButtonRound>
            </div>
          )}
        </div>
        <Textarea placeholder="Deine Meinung zählt" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        {hasPreview && (
          <div className="flex flex-col">
            <div className="flex justify-center">
              {/*eslint-disable-next-line @next/next/no-img-element*/}
              <img src={hasPreview} alt="preview" />
            </div>
          </div>
        )}
        {error && <ErrorMessage text="Couldn't mumble, sorry" />}
        <div className="flex gap-x-s pt-s">
          <Button as="button" variant="secondary" onClick={() => setIsOpen(true)}>
            <div className="flex items-center justify-center gap-x-xs">
              Bild hochladen <UploadIcon size="16" />
            </div>
          </Button>
          <Button as="button" onClick={() => handleSubmit()}>
            <div className="flex items-center justify-center gap-x-xs">
              Absenden <SendIcon size="16" />
            </div>
          </Button>
        </div>
      </div>
      {isOpen && <UploadModal onClose={handleCancel} onChange={handleFileChange} onClick={() => setIsOpen(false)} />}
    </>
  );
};
