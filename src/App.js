import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {SYSTEM_ROUTES} from './constants';
import PurchaseListScreen from './pages/PurchaseListScreen';
import AddProductScreen from './pages/AddProductScreen';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from './style/theme';

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter basename="/">
        <Switch>
          <Route
            exact
            path={SYSTEM_ROUTES.ADD_PRODUCT.routeTo}
            render={AddProductScreen}
          />
          <Route
            exact
            path={SYSTEM_ROUTES.PURCHASE_LIST.routeTo}
            render={PurchaseListScreen}
          />
          {/* <Route
            exact
            path={SYSTEM_ROUTES.CATEGORY_PRODUCT.routeTo}
            render={CategoryProductScreen}
          /> */}
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
