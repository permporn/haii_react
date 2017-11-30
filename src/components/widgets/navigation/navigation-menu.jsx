import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './navigation-menu.scss';
import Bars from 'react-icons/lib/fa/bars';
import classNames from 'classnames';
import { MENU_LIST } from './menu-list';
import Charts from 'widgets/charts/charts';
import Graphs from 'widgets/graphs/graphs';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import Checkbox from 'material-ui/Checkbox';
import CheckedIcon from 'material-ui/svg-icons/toggle/check-box';
import UncheckedIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank';

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        padding: 8,
        paddingLeft: 55,
        paddingRight: 37
    },
    labelStyle: {
        color: '#ffffff'
    }
};

class NavigationMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showSubNav: false,
            subMenuItems: [],
            menuHeaderId: '',
            showContextualMenu: false,
            autoOk: false,
            disableYearSelection: false,
            contextualLayer: ''
        }

    }
    closeSubNav = () => {
        this.setState({
            showContextualMenu: false
        })
    }
    showSubNav = (menu) => {
        this.props.updateMapType(menu.type);
        if (menu.id != this.state.menuHeaderId) {
            this.setState({
                showSubNav: true,
                subMenuItems: menu.children,
                menuHeaderId: menu.id,
                showContextualMenu: false
            })
        }
        else {
            this.setState({
                showSubNav: !this.state.showSubNav,
                subMenuItems: menu.children,
                menuHeaderId: menu.id,
                showContextualMenu: false
            })
        }

    }
    showContextual = (menu) => {
        this.props.updateMapType(menu.type);
        this.setState({
            showContextualMenu: menu.showContextualMenu,
            menuHeaderId: menu.id,
            contextualLayer: menu.layer
        })
        if (menu.layer == "FORECAST_LAYER")
            this.props.updateMapLayer("FORECAST_LAYER");
    }
    onForeCastDateChange = (date) => {
        this.setState({
            showContextualMenu: true
        })
        this.props.updateMapLayer("FORECAST_LAYER");
    }
    onSubMenuClicked = (item, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (item.layer)
            this.props.updateMapLayer(item.layer, true);
        if (item.showContextualMenu)
            this.setState({
                showContextualMenu: true,
                contextualLayer: item.layer
            })
        else {
            this.setState({
                showContextualMenu: false
            })
        }
    }
    onListClick = (e, item, mapLayer) => {
        e.preventDefault();
        e.stopPropagation();
        if (mapLayer.findIndex((layer) => layer == item.layer) > -1){
            this.props.updateMapLayer(item.layer, false);
            this.setState({
                showContextualMenu: false
            })
        }
        else {
            this.props.updateMapLayer(item.layer, true);
            if (item.showContextualMenu)
                this.setState({
                    showContextualMenu: true,
                    contextualLayer: item.layer
                })
            else {
                this.setState({
                    showContextualMenu: false
                })
            }
        }

    }
    onSubMenuChecked = (item, e, isChecked) => {
        this.props.updateMapLayer(item.layer, isChecked);
    }
    // render method of Class
    render() {
        var style = {
            display: "block"
        };
        const { pushMainMenu, mapType, mapLayer } = this.props;
        const { history } = this.context;
        const { showSubNav, subMenuItems, menuHeaderId, showContextualMenu, contextualLayer } = this.state;
        const contextualMenuClassName = classNames('sidesubnav', {
            'open': showContextualMenu == true
        },
            { 'close': showContextualMenu == false },
            { 'small-subnav': pushMainMenu == true })

        return (
            <div>
                <aside className="main-sidebar">
                    {/* sidebar: style can be found in sidebar.less */}
                    <section className="sidebar" >
                        {/* Sidebar user panel */}

                        {/* search form */}

                        {/* /.search form */}
                        {/* sidebar menu: : style can be found in sidebar.less */}
                        <ul className="sidebar-menu">
                            {
                                MENU_LIST.map((menu, index) => {
                                    const menuClassName = classNames('treeview', { 'active': (menuHeaderId == menu.id && showSubNav == true) })
                                    const mainMenuIconClassName = classNames('pull-right', { "fa fa-angle-up": showSubNav == true && menuHeaderId == menu.id }, {
                                        "fa fa-angle-down": menuHeaderId != menu.id || showSubNav == false
                                    }
                                    )
                                    return (
                                        <li onClick={menu.children ? () => this.showSubNav(menu) : () => this.showContextual(menu)} className={menuClassName}>
                                            <a href="#" data-toggle="tooltip" data-placement="right" title={pushMainMenu == true ? menu.header : null}>
                                                <i className={menu.iconClassName}>{menu.iconValue}</i>
                                                <span>
                                                    {menu.header}
                                                </span>
                                                <i className={mainMenuIconClassName}></i>
                                            </a>
                                            <ul className="treeview-menu custom-sub" >
                                                {menu.children && menu.children.map((item, index) => {
                                                    return (
                                                        menu.type == "MONITORING" ?
                                                            <li key={index} onClick={(e) => { this.onListClick(e, item, mapLayer) }} >
                                                                <Checkbox
                                                                    style={styles.checkbox}
                                                                    label={item.name}
                                                                    key={index}
                                                                    checkedIcon={<CheckedIcon style={{ fill: '#42A5F5' }}/>}
                                                                    uncheckedIcon={<UncheckedIcon  style={{ fill: 'white' }} />}
                                                                    checked={mapLayer.findIndex((layer) => layer == item.layer) > -1}
                                                                    labelPosition="left"
                                                                    labelStyle={styles.labelStyle}
                                                                /> </li> : <li onClick={(e) => { this.onSubMenuClicked(item, e) }} > <p className="custom-subitem" >{item.name}</p>
                                                            </li>)
                                                })}
                                            </ul>
                                        </li>
                                    )
                                })
                            }


                        </ul>
                    </section>

                    <div id="mySidenav" className={contextualMenuClassName}>
                        <a href="javascript:void(0)" className="closebtn" onClick={this.closeSubNav}>&times; </a>
                        <ul className="vertical-nav">
                            <Charts mapType={mapType} />
                            <Graphs contextualLayer={contextualLayer} />
                        </ul>
                    </div>


                    <div className="site-user">
                        <div className="media align-items-center">
                            <a href="#"><img className="avatar avatar-circle" src="http://www.urbanui.com/titan/images/faces/face9.jpg" /></a>
                            <div className="media-body hidden-fold">
                                <h6 className="username"><a href="#">Username</a></h6>

                                <div className="dropup"><a href="javascript:void(0)" className="dropdown-toggle usertitle" data-toggle="dropdown" aria-expanded="false">
                                    <small>Settings</small> <i className="fa fa-angle-up"></i></a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a href="#"><i className="ti-power-off"></i> Logout</a></li>
                                        <li><a href="#"><i className="ti-settings"></i> Settings</a></li>
                                        <li><a href="#"><i className="ti-announcement"></i> News</a></li>
                                        <li class="divider"></li>
                                        <li><a href="#"><i className="ti-help-alt"></i> Help</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>





                </aside>

            </div>
        );
    }
}
NavigationMenu.contextTypes = {
    history: PropTypes.object
};

export default NavigationMenu;
