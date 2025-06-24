import React from 'react';
import './App.css';
import VegetableList from './components/Vegetables';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Vegetable Management App</h1>
      </header>
      <main>
        <VegetableList />
      </main>
    </div>
  );
};

export default App;
