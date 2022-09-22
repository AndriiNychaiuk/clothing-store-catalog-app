import React from 'react';
import { LogoLink } from '../LogoLink/LogoLink';
import './Footer.scss';

export const Footer = React.memo(() => (
  <footer className="App__footer footer">
    <div className="App__container">
      <LogoLink />
    </div>
  </footer>
));