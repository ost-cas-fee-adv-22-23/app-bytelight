import { Button, CancelIcon, CheckmarkIcon, Modal } from '@smartive-education/design-system-component-library-bytelight';
import { ChangeEvent, FC } from 'react';

type UploadModalProps = {
  onClick: () => void;
  onClose: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UploadModal: FC<UploadModalProps> = ({ onChange, onClick, onClose }) => (
  <Modal onClose={onClose} title="Bild hochladen">
    <form className=" bg-slate-200 border-2 border-dashed border-slate-300 mx-l text-slate-500 rounded-lg mb-s py-xl">
      <input className="hidden" type="file" multiple={true} />
      <label htmlFor="input-file-upload">
        <div className="flex flex-col items-center justify-center">
          <input
            type="file"
            onChange={onChange}
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
      <Button as="button" variant="secondary" onClick={onClose}>
        <div className="flex items-center justify-center gap-x-xs">
          Abbrechen
          <CancelIcon size="16" />
        </div>
      </Button>
      <Button as="button" onClick={onClick}>
        <div className="flex items-center justify-center gap-x-xs">
          Speichern
          <CheckmarkIcon size="16" />
        </div>
      </Button>
    </div>
  </Modal>
);
