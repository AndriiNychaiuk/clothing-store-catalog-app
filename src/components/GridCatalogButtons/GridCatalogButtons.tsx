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

  const createButton = (
    squaresNum: number,
    slim: boolean,
    size?: 'slim',
  ) => (
    <button 
      className="buttons__button"
      onClick={() => {
        onSetSlim(Boolean(size))
      }}
    >
      {createButtonDecor(squaresNum).map((el, i) => (
        <div key={i} className={classNames(
          'buttons__button-element',
          { 
            'buttons__button-element--active': slim,
            'buttons__button-element--slim': size, 
            'buttons__button-element--big': isMobile && !size,
          },
        )}>
          {el}
        </div>
      ))}
    </button>
  )

  return (
    <div className="main__buttons buttons">
      {createButton(2, isSlim, 'slim')}
      {createButton(isMobile ? 2 : 4, !isSlim)}
    </div>
  )
})