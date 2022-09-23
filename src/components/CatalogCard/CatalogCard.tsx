import classNames from 'classnames';
import React from 'react';
import { useLocaleStorage } from '../../customHook/useLocaleStorage';
import { Product } from '../../types/Product';
import './CatalogCard.scss';

interface Props {
  product: Product,
  isSlim: boolean,
}

export const CatalogCard = React.memo<Props>(({ 
  product, 
  isSlim,
}) => {
  const [isLike, setLike] = useLocaleStorage(`${product.id}`, false);

  return (
    <li 
      key={product.id} 
      className={classNames('catalog-list__card card', {
      'card--slim': isSlim,
      'card--normal': !isSlim,
      })}
    >
      <div className={classNames('card__container', { 
        'card__container--slim': isSlim,
      })}>
        <div className={classNames('card__image-container', {
          'card__image-container--slim': isSlim,
        })}>
          <img 
            src={product.image} 
            alt={product.title} 
            className={classNames('card__image', {
              'card__image--slim': isSlim,
            })}
          />
        </div>
        <div className="card__title">{product.title}</div>
        <div className="card__price">{`${product.price} грн`}</div>
        <button 
          type="button"
          className={classNames('card__like', {
            'card__like--clicked': isLike,
          })}
          onClick={() => setLike(!isLike)}
        />
      </div>
    </li>
  )
})