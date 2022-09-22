import React from 'react';
import { LogoLink } from '../LogoLink/LogoLink';
import './Header.scss';

interface Props {
  isMobile: boolean,
  onSetMenu: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Header = React.memo<Props>(({
  isMobile, onSetMenu
}) => (
    <header className="App__header header">
      <LogoLink />

      {isMobile && (
        <button
          type="button"
          className="header__open-menu"
          onClick={() => onSetMenu(prev => !prev)}
        >
          =
        </button>
      )}
    </header>
  )
);