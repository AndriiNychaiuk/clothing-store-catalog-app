import React from 'react';
import { Link } from 'react-router-dom';
import './LogoLink.scss';

export const LogoLink = React.memo(() => (
  <h2 className="App__title header__title">
    <Link 
      to="/" 
      className="App__link header__link logo-link"
    >
      Shop
    </Link>
  </h2>
))