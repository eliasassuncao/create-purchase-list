import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {SYSTEM_ROUTES} from './constants';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from './style/theme';
import AddProductScreen from './pages/AddProductScreen';
import PurchaseListScreen from './pages/PurchaseListScreen';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter basename="/">
          <Switch>
              <Route
                exact
                path={SYSTEM_ROUTES.ADD_PRODUCT.routeTo}
                component={AddProductScreen}
              />
              <Route
                exact
                path={SYSTEM_ROUTES.PURCHASE_LIST.routeTo}
                component={PurchaseListScreen}
              />
              {/* <Route
                exact
                path={SYSTEM_ROUTES.CATEGORY_PRODUCT.routeTo}
                render={CategoryProductScreen}
              /> */}
            </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App;
