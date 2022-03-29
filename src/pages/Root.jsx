import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import StoreProvider from '../Store/Provider';
import RoutesPrivate from '../components/Routes/Private/Private';
import Home from './Home/Home.jsx';
import Login from './auth/index.jsx'
import Create from './user/create.jsx'

const PagesRoot = () => (
  <Router>
    <StoreProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/create" component={Create} />
        <RoutesPrivate path="/" component={Home} />
      </Switch>
    </StoreProvider>
  </Router>
)


export default PagesRoot;
