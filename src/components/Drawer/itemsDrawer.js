import React from 'react'
import {
    AddShoppingCart,
    ShoppingCart,

} from '@material-ui/icons';
import { SYSTEM_ROUTES } from '../../constants/systemRoutes'

export default {
    addProduct: {
        icon: <AddShoppingCart />,
        ...SYSTEM_ROUTES.ADD_PRODUCT
    },
    purchaseList: {
        icon: <ShoppingCart/>,
        ...SYSTEM_ROUTES.PURCHASE_LIST
    },
};