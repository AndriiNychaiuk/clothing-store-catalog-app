import React, { useEffect, useState } from 'react';
import './App.scss';
import { CatalogList } from './components/CatalogList/CatalogList';
import { Categories } from './components/Categories/Categories';
import { Product } from './types/Product';
import clothes from './api/clothes.json'
import { SpecialCategories } from './enums/enums';
import { GridCatalogButtons } from './components/GridCatalogButtons/GridCatalogButtons';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isSlim, setSlim] = useState(false);
  const [
    filterParameter, serFilterParameter
  ] = useState<string>(SpecialCategories.showAll);
  const [isMenuOpened, setMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const allCategories: string[] = [];
    const { innerWidth } = window;

    clothes.forEach(cloth => {
      if (!allCategories.includes(cloth.category)) {
        allCategories.push(cloth.category) 
      }
    });

    if (innerWidth < 768) {
      setIsMobile(true);
    }

    setProducts(clothes);
    setCategories([
      SpecialCategories.showAll,
      SpecialCategories.sale,
      SpecialCategories.bestsellers,
      ...allCategories,
    ]);
  }, []);

  console.log(products);  
  console.log(categories);

  return (
    <div className="App">
      <div>
        <div className="App__container">
          <header className="App__header">
            <h2 className="App__title">Shop</h2>
            {isMobile && (
              <button
                type="button"
                className="App__open-menu"
                onClick={() => setMenu(!isMenuOpened)}
              >
                =
              </button>
            )}
          </header>
        </div>

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
                filterParameter={filterParameter}
                isMenuOpened={isMenuOpened}
                isMobile={isMobile}
                onSetFilterParameter={serFilterParameter}
                onCloseMenu={setMenu}
              />
              <CatalogList 
                products={products} 
                filterParameter={filterParameter} 
                isSlim={isSlim}
              />
            </div>
          </div>
        </main>
      </div>

      <footer className="App__footer">
        <div className="App__container">
          <h2 className="App__title">Shop</h2>
        </div>
      </footer>
    </div>
  );
}

export default App;
