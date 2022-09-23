/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { SpecialCategories } from '../../enums/enums';
import { Product } from '../../types/Product';
import { CatalogList } from '../CatalogList/CatalogList';
import { Categories } from '../Categories/Categories';
import { GridCatalogButtons } from '../GridCatalogButtons/GridCatalogButtons';
import clothes from '../../api/clothes.json';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Main.scss';

interface Props {
  isMenuOpened: boolean,
  isMobile: boolean,
  onSetMenu: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Main = React.memo<Props>(({ 
  isMenuOpened ,
  isMobile,
  onSetMenu,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isSlim, setSlim] = useState(false);

  const navigation = useNavigate()
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  
  const { categoryName = '' } = useParams();

  const visibleProducts = useMemo(() => { 
    return products.filter(product => {
      switch (categoryName) {
        case SpecialCategories.sale:
          return product.price < 400;

        case SpecialCategories.bestsellers: 
          return product.rating >= 4;

        case SpecialCategories.showAll:
        case '':
          return true;

        default:
          return product.category === categoryName;
      }
    });
  }, [categoryName, products])

  useEffect(() => {
    const allCategories: string[] = [];
    const slimCheck = search.includes('slim');

    clothes.forEach(cloth => {
      if (!allCategories.includes(cloth.category)) {
        allCategories.push(cloth.category) 
      }
    });

    setSlim(slimCheck);
    setProducts(clothes);
    setCategories([
      SpecialCategories.showAll,
      SpecialCategories.sale,
      SpecialCategories.bestsellers,
      ...allCategories,
    ]);
  }, []);

  useEffect(() => {
    if (isSlim) {
      searchParams.set('slim', `${isSlim}`);
    } else {
      searchParams.delete('slim');
    }

    navigation(`?${searchParams}`, { replace: true });
  }, [isSlim])

  return (
    <main className="App__main main">
      <div className="App__container main__container">
        <GridCatalogButtons
          isSlim={isSlim}
          isMobile={isMobile}
          onSetSlim={setSlim}
        />

        <div className="main__flex">
          <Categories 
            categories={categories} 
            isMenuOpened={isMenuOpened}
            isMobile={isMobile}
            onCloseMenu={onSetMenu}
          />
          <CatalogList
            visibleProducts={visibleProducts}
            isSlim={isSlim}
            isMobile={isMobile}
          />
        </div>
      </div>
    </main>
  )
})