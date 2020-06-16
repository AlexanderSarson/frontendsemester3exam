import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import './style.css';
import { AuthProvider } from './contexts/AuthContext';
import 'semantic-ui-css/semantic.min.css';

const AppWithRouter = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};
ReactDOM.render(
  <AuthProvider>
    <AppWithRouter />
  </AuthProvider>,
  document.getElementById('root')
);
