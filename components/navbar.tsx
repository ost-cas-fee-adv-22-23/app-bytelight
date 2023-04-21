import {
  LogoutIcon,
  NavbarButton,
  NavbarMumble,
  ProfilePicture,
  SettingsIcon,
} from '@smartive-education/design-system-component-library-bytelight';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { fallBackImgUrl } from '../helper';

export const Navbar = () => {
  const { data: session } = useSession();

  const user = session?.user.id;
  const avatarUrl = session?.user.avatarUrl;

  return (
    <div className="flex items-center bg-violet-600 w-full  px-[25px] md:px-[50px] xl:px-[360px] py-xs">
      <span className="hover:scale-105 transition ease-in-out">
        <Link href={'/'}>
          <NavbarMumble />
        </Link>
      </span>

      <div className="w-full flex justify-end items-center gap-x-s">
        <div className="hover:scale-105 transition ease-in-out">
          <Link href={`/profile/${user}`}>
            <ProfilePicture size="S" src={avatarUrl ?? fallBackImgUrl} alt="profile-avatar" />
          </Link>
        </div>
        <div className="text-white">
          <NavbarButton label="Settings" onClick={() => alert('Hoi')}>
            <div className="group-hover:rotate-180 transition duration-1000 transform-none text-white">
              <SettingsIcon size="16px" />
            </div>
          </NavbarButton>
        </div>
        <div className="text-white">
          <NavbarButton
            label="Log Out"
            onClick={() => {
              signOut({ callbackUrl: '/login' });
            }}
          >
            <div className="text-white">
              <LogoutIcon size="16px" />
            </div>
          </NavbarButton>
        </div>
      </div>
    </div>
  );
};
