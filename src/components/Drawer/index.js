import React, { Component } from 'react'
import { Styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import _ from 'lodash'
import MenuItems from './itemsDrawer'
import { connect } from 'react-redux'
import Hidden from '@material-ui/core/Hidden';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { compose } from 'redux'
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    List,
    Drawer,
    IconButton,
} from '@material-ui/core';
import { toggleSideMenu, largeSideMenu } from '../../actions';
import classNames from 'classnames';


class DrawerMenu extends Component {

    state = {
        activeListItem: null
    };

    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }

    renderList() {
        const { classes } = this.props;
        return (
            _.map(MenuItems, (listItem, index) => {
                return (
                    <div key={index}>
                        <List>
                        <ListItem
                            key={`sidebar_${index}`}
                            button
                            component={Link}
                            to={listItem.routeTo}
                            onClick={() => this.handleDrawerToggle(index)}
                            className={this.state.activeListItem === index ? classes.activeListItem : ''}
                        >
                            <ListItemIcon>
                                {listItem.icon}
                            </ListItemIcon>
                            <ListItemText
                            classes={{
                                primary: classes.menuItemTxt
                            }}
                            primary={listItem.title} />
                            </ListItem>
                        </List>
                    </div>
                )
            })
        )
    };

    handleDrawerToggle = (listIndex) => {
        this.setState({ activeListItem: listIndex });
        this.props.toggleSideMenu();
    };

    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div className={classes.overflowContent}>
                {this.renderList()}
            </div>
        );
        return (
            <div
                className={classNames(classes.divDrawerPaperOpen, !this.props.menuOpen && classes.divDrawerPaperClose)}>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        open={this.props.menuBar}
                        onClose={this.handleDrawerToggle}

                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, 
                        }}>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.props.menuOpen && classes.drawerPaperClose),
                            paperAnchorDockedLeft: classes.notBorder
                        }}
                        open={this.props.menuOpen}
                    >
                        <div className={classes.toolbar}>
                            <IconButton 
                                onClick={this.props.largeSideMenu}
                            >
                                {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                            </IconButton>
                        </div>
                        {drawer}
                    </Drawer>
                </Hidden>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        menuBar: state.systemSettings.menuMobileIsOpen,
        menuLargeBar: state.systemSettings.menuLargeIsOpen,
        menuOpen: state.systemSettings.menuLargeIsOpen,
    }
};

export default compose(
    withStyles(Styles, { withTheme: true }),
    connect(mapStateToProps, { toggleSideMenu, largeSideMenu })
)(DrawerMenu);