import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from './contexts/auth';
//import App from './App';
import Home from './pages/Home';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Home />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

