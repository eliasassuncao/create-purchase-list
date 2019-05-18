import React, {Component} from 'react';
import AppTopBar from '../../components/AppTopBar'
import DrawerMenu from '../../components/Drawer'
import { withStyles } from '@material-ui/core/styles';
import {Styles} from "./styles";
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
  InputLabel 
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

class AddProductScreen extends Component {
  
  state = {
    foodList: [],
    categoryList: [],
    inputs: {
      inputSearchValue: "",
      selectBoxValue: ""
    }
  };

  componentDidMount() {
      this._fetchCategoryAndFoods()
  };

  _fetchCategoryAndFoods = async() => {
    let category = await fetchCategoryService();
    let foodArr = await fetchFoodService()
    let arrFormated = this._formatArrFood(foodArr);
    this.setState({
      categoryList: category.data,
      foodList: arrFormated
    }, () => {
     
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
        description: descriptionSplited[0]
      }
    })
    /*
      Retirando os "description" repetidos que contém no meu array.
    */
    return _.mapKeys(foodDescriptionFormated , 'description');
  };

  _onChangeSearchInput = _.debounce((e) => {
    this.setState({
      ...this.state,
      inputs: {
        ...this.state.inputs,
        inputSearchValue: e.target.value
      }
    }, () => {
        //BUSCAR NA LISTA
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
      inputs: {selectBoxValue}
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
      inputs: {inputSearch}
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
      foodList
    } = this.state;
    console.log(foodList, "<---- foodList")
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
              _.map(foodList,(item, index) => (
                <ListItem className={classes.listItem} key={item.id}>
                  <ListItemText
                    primary={item.description}
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
