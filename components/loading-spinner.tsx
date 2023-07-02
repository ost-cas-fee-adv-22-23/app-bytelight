import Image from 'next/image';
import { FC } from 'react';
import myLoadingGif from '../public/spinner-200px.gif';

type Props = {
  imageWidth: number;
};

export const LoadingSpinner: FC<Props> = ({ imageWidth }) => (
  <div className="flex justify-center w-full">
    <Image src={myLoadingGif} alt="loading-gif" width={imageWidth} />
  </div>
);
