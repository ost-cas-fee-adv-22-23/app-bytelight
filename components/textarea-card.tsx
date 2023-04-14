import {
  Button,
  ButtonRound,
  CancelIcon,
  Heading4,
  ProfilePicture,
  SendIcon,
  Textarea,
  UploadIcon,
} from '@smartive-education/design-system-component-library-bytelight';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';
import { postMumble } from '../services/qwacker';
import { UploadModal } from './upload-modal';

export const TextareaCard = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasFile, setHasFile] = useState<File | undefined>();
  const [hasPreview, setHasPreview] = useState<string | undefined>('');
  const { data: session } = useSession();

  const handleSubmit = async () => {
    const res = await postMumble(inputValue, hasFile, session?.accessToken);
    window.location.reload();
    return res;
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
      <div className="bg-white w-[680px]  px-xl py-l rounded-2xl relative">
        <div className="absolute -left-8 top-5">
          <ProfilePicture
            size="M"
            src={
              session?.user.avatarUrl ??
              'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
            }
            alt="profile-picture"
          />
        </div>
        <div className="pb-l flex w-full justify-between">
          <Heading4>Hey was gibts neues?</Heading4>
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
