import React, { useEffect, useState } from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Main } from './components/Main/Main';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  const [isMenuOpened, setMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const { innerWidth } = window;

    if (innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  return (
    <div className="App">
      <div>
        <div className="App__container">
          <Header isMobile={isMobile} onSetMenu={setMenu} />
        </div>

        <Routes>
          <Route path="/" element={
            <Main 
              isMenuOpened={isMenuOpened}
              isMobile={isMobile}
              onSetMenu={setMenu} 
            />}
          />

          <Route path='/:categoryName' element={
            <Main 
              isMenuOpened={isMenuOpened}
              isMobile={isMobile}
              onSetMenu={setMenu} 
            />}
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
