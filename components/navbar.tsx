import {
  LogoutIcon,
  NavbarButton,
  NavbarMumble,
  ProfilePicture,
  SettingsIcon,
} from '@smartive-education/design-system-component-library-bytelight';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export const Navbar = () => (
  <div className="flex items-center bg-violet-600 w-full  px-[25px] md:px-[50px] xl:px-[360px] py-xs">
    <Link href={'/feed'}>
      <NavbarMumble />
    </Link>

    <div className="w-full flex justify-end items-center gap-x-s">
      <ProfilePicture size="S" src="" alt="" />
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
