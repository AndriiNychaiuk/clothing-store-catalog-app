import React from 'react';
import './Categories.scss';

interface Props {
  categories: string[],
  filterParameter: string,
  isMenuOpened: boolean,
  isMobile: boolean,
  onSetFilterParameter: React.Dispatch<React.SetStateAction<string>>,
  onCloseMenu: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Categories = React.memo<Props>(({ 
  categories,
  filterParameter,
  isMenuOpened,
  isMobile,
  onSetFilterParameter,
  onCloseMenu,
  
}) => {
  console.log('categories');
  
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
          <button 
            className="categories__button"
            onClick={() => {
              onSetFilterParameter(category);
              onCloseMenu(false);
            }}
            disabled={filterParameter === category}
          >
            {category}
          </button>
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