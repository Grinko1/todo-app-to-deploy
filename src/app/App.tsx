import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense } from 'react';
import './styles/index.scss';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from 'pages/MainPage/MainPage';
import { Header } from 'widgets/Header';



const App = () => {
  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback="">
       <Header/>
        <Routes>
        <Route path="*" element={<MainPage />} />

        </Routes>
       
      </Suspense>
    </div>
  );
};

export default App;
