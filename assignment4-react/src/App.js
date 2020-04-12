import React from 'react';
import styles from './App.module.scss';
import FilmsList from "./FIlmsList/FilmsList";

function App() {
  return (
      <div className={styles['app']}>
        <FilmsList className={styles['app__films-list']}/>
      </div>
  );
}

export default App;
