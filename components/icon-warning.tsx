import React, { FC } from 'react';
type Props = {
  size?: string;
};

export const IconWarning: FC<Props> = ({ size }) => (
  <svg width={size || '100%'} height={size || '100%'} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.57514 3.21665L1.51681 15C1.37128 15.252 1.29428 15.5377 1.29346 15.8288C1.29265 16.1198 1.36805 16.4059 1.51216 16.6588C1.65627 16.9116 1.86408 17.1223 2.1149 17.2699C2.36571 17.4174 2.65081 17.4968 2.94181 17.5H17.0585C17.3495 17.4968 17.6346 17.4174 17.8854 17.2699C18.1362 17.1223 18.344 16.9116 18.4881 16.6588C18.6322 16.4059 18.7076 16.1198 18.7068 15.8288C18.706 15.5377 18.629 15.252 18.4835 15L11.4251 3.21665C11.2766 2.97174 11.0674 2.76925 10.8178 2.62872C10.5682 2.48819 10.2866 2.41437 10.0001 2.41437C9.71369 2.41437 9.43208 2.48819 9.18248 2.62872C8.93287 2.76925 8.7237 2.97174 8.57514 3.21665Z"
      fill="#E02805"
      stroke="#E02805"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10 7.5V10.8333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 14.1667H10.0083" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
