import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Fullscreen: FC<Props> = ({ children }) => (
  <div className="h-full min-h-screen bg-slate-100">
    <div className="flex min-h-screen w-full justify-center">
      <div className="sm:w-11/12 md:w-3/4 my-m">
        <div className="flex justify-center">{children}</div>
      </div>
    </div>
  </div>
);
