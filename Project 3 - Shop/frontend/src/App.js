import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Content from "./components/content/Content";
import Provider from "./context/Provider";

const App = () => {
  return (
      <Provider>
          <Header />
          <Content />
      </Provider>
  )
}

export default App;
