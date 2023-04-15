import Image from 'next/image';
import myLoadingGif from '../data/spinner-200px.gif';
import { FC } from 'react';

type Props = {
  imageWidth: number;
};

export const LoadingSpinner: FC<Props> = ({ imageWidth }) => (
  <div className="flex justify-center w-full">
    <Image src={myLoadingGif} alt="loading-gif" width={imageWidth} />
  </div>
);
