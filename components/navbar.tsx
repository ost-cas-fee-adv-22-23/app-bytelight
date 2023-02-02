import {
  LogoutIcon,
  NavbarButton,
  NavbarMumble,
  ProfilePicture,
  SettingsIcon,
} from '@smartive-education/design-system-component-library-bytelight';
import { FC, useState } from 'react';
import { SettingsModal } from './settings-modal';

export const Navbar: FC = () => {
  const [showSettingsModal, setShowSettingsModal] = useState<Boolean>(false);
  const [inputValue, setInputValue] = useState<String>('');

  const onInputHandler = (input: string) => {
    setInputValue(input);
  };

  return (
    <div className="flex items-center bg-violet-600 w-full  px-[25px] md:px-[50px] xl:px-[360px] py-xs">
      <NavbarMumble />
      <div className="w-full flex justify-end items-center gap-x-s">
        <ProfilePicture size="S" src="" alt="" />
        <div className="text-white">
          <NavbarButton label="Settings" onClick={() => setShowSettingsModal(!showSettingsModal)}>
            <div className="group-hover:rotate-180 transition duration-1000 transform-none text-white">
              <SettingsIcon size="16px" />
            </div>
          </NavbarButton>
        </div>
        <div className="text-white">
          <NavbarButton label="Log Out" onClick={() => {}}>
            <div className="text-white">
              <LogoutIcon size="16px" />
            </div>
          </NavbarButton>
        </div>
      </div>
      {showSettingsModal && <SettingsModal onClose={() => setShowSettingsModal(false)} onInputHandler={onInputHandler} />}
    </div>
  );
};
