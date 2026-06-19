import React from 'react';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './App.css';

function App() {
  return (
    <UserProvider>
      <div className="app">
        <Home />
      </div>
    </UserProvider>
  );
}

export default App;