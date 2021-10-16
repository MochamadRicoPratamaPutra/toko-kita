import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PublicRoute from './publicRoute';
import PrivateRoute from './privateRoute';
import Home from '../../pages/home';
import Login from '../../pages/login';
import AddProduct from '../../pages/addProduct';
import Product from '../../pages/product';
import EditProduct from '../../pages/edit';
import Search from '../../pages/search';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute search={true} exact path="/" component={Home} />
        <Route exact path="/auth" component={Login} />
        <PrivateRoute exact path="/add-product" component={AddProduct} />
        <PrivateRoute exact path="/edit/:id" component={EditProduct} />
        <PublicRoute search={true} exact path="/product/:id" component={Product} />
        <PublicRoute search={true} exact path="/search" component={Search} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
