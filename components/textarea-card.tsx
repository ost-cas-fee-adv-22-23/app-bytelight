import {
  Button,
  ButtonRound,
  CancelIcon,
  CheckmarkIcon,
  Heading4,
  Modal,
  ProfilePicture,
  SendIcon,
  Textarea,
  UploadIcon,
} from '@smartive-education/design-system-component-library-bytelight';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';
import { postMumble } from '../services/qwacker';

export const TextareaCard = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | undefined>();
  const [hasPreview, setHasPreview] = useState<string | undefined>('');
  console.log(file);
  const { data: session } = useSession();

  const handleSubmit = async () => {
    const res = await postMumble(inputValue, file, session?.accessToken);
    return res;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setHasPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCancel = () => {
    setFile(undefined);
    setIsOpen(false);
  };

  return (
    <>
      <div className="bg-white w-[680px]  px-xl py-l rounded-2xl relative">
        <div className="absolute -left-8 top-5">
          <ProfilePicture size="M" src={session?.user.avatarUrl ?? ''} alt="profile-picture" />
        </div>
        <div className="pb-l flex w-full justify-between">
          <Heading4>Hey was gibts neues?</Heading4>
          {hasPreview && (
            <div>
              <ButtonRound
                onClick={() => {
                  setHasPreview(undefined);
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
      {isOpen && (
        <Modal
          onClose={() => {
            handleCancel();
          }}
          title="Bild hochladen"
        >
          <form className=" bg-slate-200 border-2 border-dashed border-slate-300 mx-l text-slate-500 rounded-lg mb-s py-xl">
            <input className="hidden" type="file" multiple={true} />
            <label htmlFor="input-file-upload">
              <div className="flex flex-col items-center justify-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="text-sm text-slate-600 
            file:mr-5 file:py-2 file:px-6
            file:rounded-lg file:border-0
            file:text-sm file:font-medium
            file:bg-violet-600 file:text-white
            hover:file:cursor-pointer hover:file:bg-violet-700 
          "
                />
              </div>
            </label>
          </form>
          <div className="flex mb-xl px-l "></div>
          <div className="flex px-l gap-x-s pb-l">
            <Button as="button" variant="secondary" onClick={() => setIsOpen(false)}>
              <div className="flex items-center justify-center gap-x-xs">
                Abbrechen
                <CancelIcon size="16" />
              </div>
            </Button>
            <Button as="button" onClick={() => setIsOpen(false)}>
              <div className="flex items-center justify-center gap-x-xs">
                Speichern
                <CheckmarkIcon size="16" />
              </div>
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
