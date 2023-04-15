import React, { FC } from 'react';
import { IconWarning } from './icon-warning';

type Props = {
  text: string;
};

export const ErrorMessage: FC<Props> = ({ text }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="inline-flex flex-row w-full justify-center items-center bg-yellow-200 p-3 m-2 rounded">
        <span className="mr-3">
          <IconWarning size={'20px'} />
        </span>
        <span className="mr-1">{text}</span>
      </div>
    </div>
  );
};
