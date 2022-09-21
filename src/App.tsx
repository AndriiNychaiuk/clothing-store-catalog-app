import React, { useEffect, useState } from 'react';
import './App.scss';
import { CatalogList } from './components/CatalogList/CatalogList';
import { Categories } from './components/Categories/Categories';
import { Product } from './types/Product';
import clothes from './api/clothes.json'


const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setProducts(clothes)

    const arr: string[] = [];

    for (const cloth of clothes) {
      if (!arr.includes(cloth.category)) {
        arr.push(cloth.category);
      }
    }

    setCategories(arr)
  }, []);

  console.log(products);  
  console.log(categories);

  return (
    <div className="App">
      <header className="App__header">
        <div className="App__container">
          <h2 className="App__title">Shop</h2>
        </div>
      </header>

      <main className="App__main">
        <div className="App__container">
          <div className="App__flex">
            <Categories categories={categories} />
            <CatalogList products={products} />
          </div>
          
        </div>
      </main>

      <footer className="App__footer">
        <div className="App__container">
          <h2 className="App__title">Shop</h2>
        </div>
      </footer>
    </div>
  );
}

export default App;
