import React, { Component } from 'react';
import AppTopBar from '../../components/AppTopBar'
import DrawerMenu from '../../components/Drawer'
import { withStyles } from '@material-ui/core/styles';
import { Styles } from "./styles";
import { compose } from 'redux';
import { connect } from 'react-redux'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  ListItemSecondaryAction,
  IconButton,
  CardActions,
  Button
} from '@material-ui/core';
import {
  Delete,
  Done,
  DoneAll,
  Clear
} from '@material-ui/icons';
import _ from 'lodash';
import {
  changeStatusFood,
  resetShoppingList,
  removeFood
} from '../../actions';

class PurchaseListScreen extends Component {

  render() {
    const {
      classes,
      shoppingList,
      changeStatusFood,
      resetShoppingList,
      removeFood
    } = this.props;
    return (
      <div className={classes.root}>
        <AppTopBar />
        <DrawerMenu />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Card>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.headerText}
              >
                Minha lista de compras
              </Typography>
              <List>
                <div className={classes.informationIcons}>
                  <Typography className={classes.informationText}>Item pendente</Typography>
                  <Done className={classes.informationIconPending} />
                </div>
                <div className={classes.informationIcons}>
                  <Typography className={classes.informationText}>Item no carrinho</Typography>
                  <DoneAll className={classes.informationIconInCart} />
                </div>
                <div className={classes.informationIcons}>
                  <Typography className={classes.informationText}>Excluir item</Typography>
                  <Delete className={classes.informationIconDelete} />
                </div>
              </List>
              <List className={classes.listContainer}>
                {
                  _.isEmpty(shoppingList) ?
                    <Typography>Carrinho de compras vazio</Typography>
                    :
                    _.map(shoppingList, (item, index) => (
                      <ListItem className={classes.listItem} key={item.id}>
                        <ListItemText
                          primary={item.description}
                          secondary={`quantide: ${item.quantity}`}
                        />
                        <ListItemSecondaryAction>
                          {
                            item.placed ?
                              <IconButton
                                aria-label="DoneAll"
                                onClick={() => changeStatusFood(false, index)}
                              >
                                <DoneAll
                                  className={classes.informationIconInCart}
                                />
                              </IconButton>
                              :
                              <IconButton
                                aria-label="Done"
                                onClick={() => changeStatusFood(true, index)}
                              >
                                <Done
                                  className={classes.informationIconPending}
                                />
                              </IconButton>
                          }
                          <IconButton
                            aria-label="Delete"
                            onClick={() => removeFood(item.id)}
                          >
                            <Delete className={classes.informationIconDelete} />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))
                }
              </List>
            </CardContent>
            <CardActions className={classes.divButtonClearCart}>
              <Button
                variant="contained"
                className={classes.buttonClearCart}
                onClick={() => resetShoppingList()}
              >
                Limpar Carrinho
              <Clear className={classes.iconClear} />
              </Button>
            </CardActions>
          </Card>
        </main>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  shoppingList: state.shoppingList.foodList
})

export default compose(
  withStyles(Styles, { withTheme: true }),
  connect(mapStateToProps, { changeStatusFood, resetShoppingList, removeFood }),
)(PurchaseListScreen);
