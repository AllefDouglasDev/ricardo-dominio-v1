import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import './App.global.css';

import Home from './pages/Home';
import Config from './pages/Config';
import CartaResponsabilidade from './pages/CartaResponsabilidade';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/cartaResponsabilidade"
            component={CartaResponsabilidade}
          />
          <Route path="/config" component={Config} />
        </Switch>
      </Router>
    </>
  );
}
