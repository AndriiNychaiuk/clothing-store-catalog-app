import classNames from 'classnames';
import React, { useMemo } from 'react';
import { SpecialCategories } from '../../enums/enums';
import { Product } from '../../types/Product';
import { CatalogCard } from '../CatalogCard/CatalogCard';
import './CatalogList.scss';

interface Props {
  products: Product[],
  filterParameter: string,
  isSlim: boolean,
}

export const CatalogList = React.memo<Props>(({ 
  products, filterParameter, isSlim
}) => {
  const visibleProducts = useMemo(() => { 
    return products.filter(product => {
      switch (filterParameter) {
        case SpecialCategories.sale:
          return product.price < 400;

        case SpecialCategories.bestsellers: 
          return product.rating >= 4;

        case SpecialCategories.showAll:
        case '':
          return true;

        default:
          return product.category === filterParameter;
      }
    });
  }, [filterParameter, products])
  
  return (
    <ul className={classNames('catalog-list', {
      'catalog-list--slim': isSlim,
    })}>
      {visibleProducts
        .map(product => (
          <CatalogCard 
            key={product.id} 
            product={product}
            isSlim={isSlim}
          />
      ))}
    </ul>
  );
}) 