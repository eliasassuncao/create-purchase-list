import React, {Component} from 'react'
import {Styles} from "./styles";
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import {Menu as MenuIcon} from '@material-ui/icons';
import {compose} from 'redux'
import {
    AppBar,
    Toolbar,
    IconButton,
    Hidden,
    LinearProgress
} from '@material-ui/core';
import {connect} from 'react-redux';
import {toggleSideMenu, largeSideMenu} from '../../actions/index';
import {withRouter} from 'react-router-dom'

class AppTopBar extends Component {
    handleDrawerToggle = () => {
        this.props.toggleSideMenu();
        
    };

    largeSideMenu = () => {
        this.props.largeSideMenu();
    }

    render() {
        const {classes} = this.props;

        return (
            <AppBar position="fixed" className={classNames(classes.appBar, this.props.menuOpen && classes.appBarShift)} name="APP_BAR">
                <Toolbar disableGutters={!this.props.menuOpen} >
                    <Hidden mdUp>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classNames(classes.menuButton)}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>

                    <Hidden smDown>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.largeSideMenu}
                            className={classNames(classes.menuButton, this.props.menuOpen && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>

                    <img 
                        className={classes.navIcon} 
                        src="https://image.flaticon.com/icons/png/512/45/45332.png" 
                        alt=""
                    />

                </Toolbar>
            
                <LinearProgress
                    color="secondary"
                    className={classNames(
                        this.props.loading === 0 ? classes.hide : ''
                    )}
                />

            </AppBar>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.systemSettings.countLoadingRequest,
    menuOpen: state.systemSettings.menuLargeIsOpen,
});

export default compose(
    withRouter,
    withStyles(Styles, {withTheme: true}),
    connect(mapStateToProps, {toggleSideMenu,largeSideMenu})
)(AppTopBar);