import React, {Component} from 'react';
import AppTopBar from '../../components/AppTopBar'
import DrawerMenu from '../../components/Drawer'
import { withStyles } from '@material-ui/core/styles';
import {Styles} from "./styles";
import classNames from 'classnames';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Fab,
  Typography,
  Button,
  InputLabel 
} from '@material-ui/core';
import {
  Add,
  Remove,
  AddShoppingCart,
  Check
} from '@material-ui/icons';

class AddProductScreen extends Component {
  
  state = {
    inputSearch: null,
    listProducts: [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ]
  };

  _onChangeSearchInput = (e) => {
    this.setState({inputSearch: e.target.value})
  };

  _renderSelectBox = () => {
    const {
      classes
    } = this.props;
    return (
      <FormControl>
        <InputLabel>Categoria</InputLabel>
      <Select
        value={""}
        className={classes.selectBoxCategory}
      //onChange={this.handleChange}
      >
          <MenuItem value="">
            <em>None</em>
            </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      </FormControl>
    )
  };
  
  _renderInputSearch = () => {
    const {
      classes
    } = this.props;
    const {
      inputSearch
    } = this.state
      return (
        <TextField
          id="input-search-product"
          label="Pesquisar produto..."
          value={inputSearch}
          onChange={this._onChangeSearchInput}
          className={classes.inputSearch}
      />
      )
  };

  render() {
    const {
      classes
    } = this.props;
    const {
      listProducts
    } = this.state;
    return (
      <div className={classes.root}>
      <AppTopBar />
      <DrawerMenu />
      <main className={classes.content}>  
        <div className={classes.toolbar} />
        <div>
          {this._renderSelectBox()}
          {this._renderInputSearch()}
        </div>
          <List className={classes.listContainer}>
            {
              listProducts.map((item) => (
                <ListItem className={classes.listItem}>
                  <ListItemText
                    primary="Feijão"
                  />
                  <Fab className={classes.buttonAddProduct}>
                    <Remove/>
                  </Fab>
                  <Typography className={classes.numberProductText}>
                    2
                  </Typography >
                  <Fab className={classes.buttonAddProduct}>
                    <Add/>
                  </Fab>
                </ListItem>
              ))
            }
          </List>
          <div className={classes.divButtonAddProduct}>
            <Button variant="contained" className={classes.buttonAddProductToList}>
              Adicionar produto
              <Check className={classes.iconCheck}/>
            </Button>
          </div>
      </main>
    </div>
    
    );
  }
}

export default withStyles(Styles, { withTheme: true })(AddProductScreen);
