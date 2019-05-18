import React, { Component } from 'react';
import AppTopBar from '../../components/AppTopBar'
import DrawerMenu from '../../components/Drawer'
import { withStyles } from '@material-ui/core/styles';
import { Styles } from "./styles";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Fab,
  Typography,
  Button,
  InputLabel,
  CardContent,
  Card,
  Snackbar
} from '@material-ui/core';
import {
  Add,
  Remove,
  Check
} from '@material-ui/icons';
import {
  fetchCategory as fetchCategoryService,
  fetchFood as fetchFoodService
} from '../../services';
import _ from 'lodash';
import classNames from 'classnames';
import { addFoodListToShoppingList } from '../../actions';
import { compose } from 'redux';
import { connect } from 'react-redux'

class AddProductScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foodList: [],
      categoryList: [],
      inputs: {
        inputSearchValue: "",
        selectBoxValue: ""
      }
    };
    this._onChangeSearchInput = this._onChangeSearchInput.bind(this);
  }

  componentDidMount() {
    this._fetchCategoryAndFoods()
  };

  _fetchCategoryAndFoods = async () => {
    let category = await fetchCategoryService();
    let foodArr = await fetchFoodService()
    let arrFormated = this._formatArrFood(foodArr);
    this.setState({
      categoryList: category.data,
      foodList: arrFormated
    })
  };

  _formatArrFood = (foodArr) => {
    /*
     Formatando os "description", retornando só os primeiros nomes para melhor entendimento.
     Modo vindo da api: {
       description: "Arroz, integral, cozido",
       description: "Arroz, integral, cru"
     } 
    */
    let foodDescriptionFormated = _.map(foodArr.data, (food) => {
      let descriptionSplited = food.description.split(",");
      return {
        id: food.id,
        description: descriptionSplited[0].toLowerCase(),
        category_id: food.category_id,
        quantity: 0,
        placed: false
      }
    })
    /*
      Retirando os "description" repetidos que contém no meu array.
    */
    return _.mapKeys(foodDescriptionFormated, 'description');
  };

  _onChangeSearchInput = _.debounce((event) => {
    this.setState({
      inputs: {
        ...this.state.inputs,
        inputSearchValue: event.toLowerCase()
      }
    })
  }, 700)

  _onChangeSelectBox = (e) => {
    this.setState({
      ...this.state,
      inputs: {
        ...this.state.inputs,
        selectBoxValue: e.target.value
      }
    })
  };

  _renderSelectBox = () => {
    const {
      classes
    } = this.props;
    const {
      categoryList,
      inputs: { selectBoxValue }
    } = this.state;
    return (
      <FormControl>
        <InputLabel>Categoria</InputLabel>
        <Select
          value={selectBoxValue}
          className={classes.selectBoxCategory}
          onChange={(e) => this._onChangeSelectBox(e)}
        >
          <MenuItem value={""}>
            <em>Sem categoria</em>
          </MenuItem>
          {
            categoryList.map((item, index) => (
              <MenuItem
                value={item.id}
                key={index}
              >
                {item.category}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    )
  };

  _renderInputSearch = () => {
    const {
      classes
    } = this.props;
    const {
      inputs: { inputSearch }
    } = this.state
    return (
      <TextField
        id="input-search-product"
        label="Pesquisar produto..."
        value={inputSearch}
        onChange={(e) => this._onChangeSearchInput(e.target.value)}
        className={classes.inputSearch}
      />
    )
  };

  _renderListFood = () => {
    const {
      inputs: {
        inputSearchValue,
        selectBoxValue
      },
      foodList
    } = this.state;
    let list = foodList;
    /*
      Filtro feito manualmente por conta da API não suportar buscas por string, somente por id.
    */
    if (inputSearchValue !== "") {
      if (selectBoxValue !== "") {
        list = _.filter(foodList, food => {
          if (_.includes(food.description, inputSearchValue) && food.category_id === selectBoxValue) {
            return food
          }
        })
      } else {
        list = _.filter(foodList, food => {
          if (_.includes(food.description, inputSearchValue)) {
            return food
          }
        })
      }
    } else if (selectBoxValue !== "") {
      list = _.filter(foodList, food => {
        if (food.category_id === selectBoxValue) {
          return food
        }
      })
    }
    return list;
  }

  _onChangeQuantityFood = (operator, indexFood) => {
    if (operator === 'sum') {
      this.setState({
        foodList: {
          ...this.state.foodList,
          [indexFood]: {
            ...this.state.foodList[indexFood],
            quantity: this.state.foodList[indexFood].quantity + 1
          }
        }
      })
    } else if (this.state.foodList[indexFood].quantity > 0) {
      this.setState({
        foodList: {
          ...this.state.foodList,
          [indexFood]: {
            ...this.state.foodList[indexFood],
            quantity: this.state.foodList[indexFood].quantity - 1
          }
        }
      })
    }

  }

  _onClickButtonAddProduct = () => {
    const {
      foodList
    } = this.state;
    const {
      addFoodListToShoppingList
    } = this.props;
    let foodListSelected = _.filter(foodList, food => food.quantity > 0);
    addFoodListToShoppingList(foodListSelected)
    let resetFoodList = _.map(foodList, food => {
      return {
        ...food,
        quantity: 0
      }
    })
    this.setState({ foodList: resetFoodList, snackbar: true })
  };

  render() {
    const {
      classes
    } = this.props;
    const {
      snackbar
    } = this.state;
    return (
      <div className={classes.root}>
        <AppTopBar />
        <DrawerMenu />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Card>
            <CardContent>
              <div>
                {this._renderSelectBox()}
                {this._renderInputSearch()}
              </div>
              <List className={classes.listContainer}>
                {
                  _.map(this._renderListFood(), (item, index) => (
                    <ListItem className={classes.listItem} key={item.id}>
                      <ListItemText
                        primary={item.description}
                      />
                      <Fab
                        className={classes.buttonAddProduct}
                        onClick={() => this._onChangeQuantityFood('subtract', index)}
                      >
                        <Remove />
                      </Fab>
                      <Typography className={classNames(
                        item.quantity > 0 ?
                          classes.numberProductText
                          :
                          classes.numberProductText
                      )}>
                        {item.quantity}
                      </Typography >
                      <Fab
                        className={classes.buttonAddProduct}
                        onClick={() => this._onChangeQuantityFood('sum', index)}
                      >
                        <Add />
                      </Fab>
                    </ListItem>
                  ))
                }
              </List>
              <div className={classes.divButtonAddProduct}>
                <Button
                  variant="contained"
                  className={classes.buttonAddProductToList}
                  onClick={() => this._onClickButtonAddProduct()}
                >
                  Adicionar produto
              <Check className={classes.iconCheck} />
                </Button>
              </div>
            </CardContent>
          </Card>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
            open={snackbar}
            onClose={() => this.setState({snackbar: false})}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Adicionado ao seu carrinho de compras com sucesso!</span>}
          />
        </main>
      </div>

    );
  }
}

export default compose(
  withStyles(Styles, { withTheme: true }),
  connect(null, { addFoodListToShoppingList }),
)(AddProductScreen);
