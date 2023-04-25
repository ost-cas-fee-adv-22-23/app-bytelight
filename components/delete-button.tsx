import { CancelIcon } from '@smartive-education/design-system-component-library-bytelight';
import { FC } from 'react';

type Props = {
  onClick: () => void;
};

export const DeleteButton: FC<Props> = ({ onClick }) => (
  <div className="flex items-center text-slate-600 hover:bg-slate-100 hover:rounded-2xl p-xs hover:text-slate-800">
    <button className="" onClick={onClick}>
      <span className="flex items-center gap-x-xs">
        <CancelIcon size="16px" /> Delete
      </span>
    </button>
  </div>
);
