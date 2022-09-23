/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocaleStorage } from '../../customHook/useLocaleStorage';
import { Product } from '../../types/Product';
import { CatalogCard } from '../CatalogCard/CatalogCard';
import './CatalogList.scss';
import './Pagination.scss';

interface Props {
  visibleProducts: Product[],
  isSlim: boolean,
  isMobile: boolean,
}

export const CatalogList = React.memo<Props>(({ 
  visibleProducts, 
  isSlim,
  isMobile,
}) => {
  const [page, setPage] = useLocaleStorage('page', 1);
  
  const navigation = useNavigate()
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const maxPage = useMemo(() => {
    if (isMobile) {
      return Math.ceil(isSlim 
        ? visibleProducts.length
        : visibleProducts.length / 2
      )
    } else {
      return Math.ceil(isSlim 
        ? visibleProducts.length / 2
        : visibleProducts.length / 4
      )
    }
  }, [isSlim, visibleProducts])

  useEffect(() => {
    searchParams.set('page', `${page}`);

    navigation(`?${searchParams}`, { replace: true });
  }, [page])

  useEffect(() => {
    if (maxPage !== 0 && maxPage < page) {
      setPage(maxPage);
    }
  }, [isSlim])

  return (
    <div className="pagination">
      <ul 
        className={classNames('catalog-list', {
        'catalog-list--slim': isSlim,
        })}
        style={{ transform: `translateX(-${100 * (page - 1)}%)` }}
      >
        {visibleProducts
          .map(product => (
            <CatalogCard 
              key={product.id} 
              product={product}
              isSlim={isSlim}
            />
        ))}
      </ul>
      <div className="pagination__buttons">
          <button 
            type="button" 
            className="pagination__button"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            PREV
            <div 
              className="pagination__arrow pagination__arrow--left" 
              style={page === 1 ? { opacity: 0.3 } : {}}
            />
          </button>

          <button 
            type="button" 
            className="pagination__button"
            onClick={() => setPage(page + 1)}
            disabled={page >= maxPage}
          >
            NEXT
            <div 
              className="pagination__arrow pagination__arrow--right" 
              style={page >= maxPage ? { opacity: 0.3 } : {}}
            />
          </button>
        </div>
    </div>
  );
}) 