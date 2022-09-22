import classNames from 'classnames';
import React from 'react';
import './GridCatalogButtons.scss';

interface Props {
  isSlim: boolean,
  isMobile: boolean,
  onSetSlim: React.Dispatch<React.SetStateAction<boolean>>,
}

export const GridCatalogButtons = React.memo<Props>(({
  isSlim,
  isMobile,
  onSetSlim,
}) => {
  const createButtonDecor = (num: number) => {
    const arr: string[] = [];

    for (let i = 0; i < num; i++) {
      arr.push('')
    }

    return arr;
  };

  return (
    <div className="App__buttons buttons">
      <button 
        className="buttons__button"
        onClick={() => {
          onSetSlim(true)
        }}
        disabled={isSlim}
      >
        {createButtonDecor(2).map((el, i) => (
          <div key={i} className={classNames(
            'buttons__button-element',
            'buttons__button-element--slim',
            { 'buttons__button-element--active': isSlim },
          )}>
            {el}
          </div>
        ))}
      </button>

      <button 
        className="buttons__button"
        onClick={() => {
          onSetSlim(false)
        }}
        disabled={!isSlim}
      >
        {createButtonDecor(isMobile ? 2 : 4).map((el, i) => (
          <div key={i} className={classNames('buttons__button-element', {
            'buttons__button-element--big': isMobile,
            'buttons__button-element--active': !isSlim,
          })}>
            {el}
          </div>
        ))}
      </button>
    </div>
  )
})