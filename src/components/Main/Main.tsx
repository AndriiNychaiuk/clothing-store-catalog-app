/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { SpecialCategories } from '../../enums/enums';
import { Product } from '../../types/Product';
import { CatalogList } from '../CatalogList/CatalogList';
import { Categories } from '../Categories/Categories';
import { GridCatalogButtons } from '../GridCatalogButtons/GridCatalogButtons';
import clothes from '../../api/clothes.json';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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

  console.log(categoryName);
  

  useEffect(() => {
    const allCategories: string[] = [];
    const slimCheck = Boolean(search.slice(-4));

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
    <main className="App__main">
      <div className="App__container">
        <GridCatalogButtons
          isSlim={isSlim}
          isMobile={isMobile}
          onSetSlim={setSlim}
        />

        <div className="App__flex">
          <Categories 
            categories={categories} 
            isMenuOpened={isMenuOpened}
            isMobile={isMobile}
            onCloseMenu={onSetMenu}
          />
          <CatalogList
            products={products} 
            filterParameter={categoryName} 
            isSlim={isSlim}
          />
        </div>
      </div>
    </main>
  )
})