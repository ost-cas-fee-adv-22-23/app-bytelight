import {
  Button,
  Heading4,
  ProfilePicture,
  SendIcon,
  Textarea,
  UploadIcon,
} from '@smartive-education/design-system-component-library-bytelight';
import { useState } from 'react';

export const TextareaCard = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="bg-white w-[680px]  px-xl py-l rounded-2xl relative">
      <div className="absolute -left-8 top-5">
        <ProfilePicture
          size="M"
          src={
            'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
          }
          alt="profile-picture"
        />
      </div>
      <div className="pb-l">
        <Heading4>Hey was gibts neues?</Heading4>
      </div>
      <Textarea placeholder="Deine Meinung zählt" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

      <div className="flex gap-x-s pt-s">
        <Button as="button" variant="secondary">
          <div className="flex items-center justify-center gap-x-xs">
            Bild hochladen <UploadIcon size="16" />
          </div>
        </Button>
        <Button as="button">
          <div className="flex items-center justify-center gap-x-xs">
            Absenden <SendIcon size="16" />
          </div>
        </Button>
      </div>
    </div>
  );
};
