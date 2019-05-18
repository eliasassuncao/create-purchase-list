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
        maxWidth: 600 
    },
    listContainer: {
        overflowX: 'auto',
        maxHeight: 400,
    },
    listItem: {
        paddingLeft: 0
    },
    informationIcons: {
        display: 'flex'
    },
    informationText: {
        fontSize: 15,
        marginRight: 15
    },
    informationIconPending: {
        color: '#ffca00 '
    },
    informationIconInCart: {
        color: '#64fe07'
    },
    informationIconDelete: {
        color: '#ff2b2b'
    },
    divButtonClearCart: {
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center'
    },
    buttonClearCart: {
        backgroundColor: '#ff8d00' ,
        color: 'white'
    },
    iconClear: {
        color: 'white'
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20
    },
    listEmptyText: {
        fontWeight: '600'
    }
    
});