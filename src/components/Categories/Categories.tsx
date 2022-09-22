import classNames from 'classnames';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Categories.scss';

interface Props {
  categories: string[],
  isMenuOpened: boolean,
  isMobile: boolean,
  onCloseMenu: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Categories = React.memo<Props>(({ 
  categories,
  isMenuOpened,
  isMobile,
  onCloseMenu,
  
}) => {
  const { search } = useLocation();

  return (
    <ul 
      className="App__categories categories"
      style={isMenuOpened 
        ? { transform: 'translateX(0)' } 
        : {}
      }
    >
      {categories.map(category => (
        <li key={category} className="categories__item">
          <NavLink 
            to={{
              pathname: `../${category}`,
              search,
            }}
            className={({ isActive }) => classNames('categories__link', {
              'categories__link--active': isActive, 
            })}
            onClick={() => onCloseMenu(false)}
          >
            {category}
          </NavLink>
        </li>
      ))}
        {isMobile && (
          <button 
          type="button"
          className="categories__button categories__button--close"
          onClick={() => onCloseMenu(false)}
        >
          X
        </button>
        )}
    </ul>
  )
}) 