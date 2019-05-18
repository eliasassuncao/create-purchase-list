export const Styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative', //relative
        display: 'flex',
        width: '100%',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        maxWidth: 500
    },
    inputSearch: {
        [theme.breakpoints.up('md')]: {
            width: 300
        }
    },
    selectBoxCategory: {
        marginTop: 15,
        minWidth: 20,
        marginRight: 25,
        width: 150
    },
    numberProductText: {
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 15
    },
    listContainer: {
        overflowX: 'auto',
        maxHeight: 400,
        marginTop: 40
    },
    buttonAddProduct: {
        width: 35,
        height: 30,
        backgroundColor: '#ff8d00',
        color: 'white'
    },
    listItem: {
        paddingLeft: 0
    },
    divButtonAddProduct: {
        marginTop: 40,
        marginBottom: 40,
        display: 'flex',
        justifyContent: 'center'
    },
    buttonAddProductToList: {
        backgroundColor: '#ff8d00' ,
        color: 'white'
    },
    iconCheck: {
        color: 'white'
    }
});