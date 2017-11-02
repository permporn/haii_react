import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './navigation-menu.scss';
import Bars from 'react-icons/lib/fa/bars';
import classNames from 'classnames';
import { MENU_LIST } from './menu-list';
import Collapsible from 'react-collapsible';
class NavigationMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showSubNav: false,
            subMenuItems: [],
            menuHeaderId: ''
        }

    }
    closeSubNav = () => {
        this.setState({
            showSubNav: false
        })
    }
    showSubNav = (menu) => {
        this.setState({
            showSubNav: true,
            subMenuItems: menu.children,
            menuHeaderId: menu.id
        })
    }
    redirectToLink = (menu) => {
        this.setState({
            showSubNav: false,
            menuHeaderId: menu.id
        })
    }

    // render method of Class
    render() {
        var style = {
            display: "block"
        };
        const { pushMainMenu } = this.props;
        const { history } = this.context;
        const { showSubNav, subMenuItems, menuHeaderId } = this.state;
        const subNavClassName = classNames('sidesubnav', {
            'open': showSubNav == true
        },
            { 'close': showSubNav == false },
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
                            {/* <li className="header">Forcast Analytic</li> */}
                            {
                                MENU_LIST.map((menu, index) => {
                                    const menuClassName = classNames('treeview', { 'active': menuHeaderId == menu.id })
                                    return (
                                        <li onClick={menu.children ? () => this.showSubNav(menu) : () => this.redirectToLink(menu)} className={menuClassName}>
                                            <a  href="#" data-toggle="tooltip" data-placement="right" title={pushMainMenu == true ? menu.header : null}>
                                                <i className={menu.iconClassName}>{menu.iconValue}</i>
                                                <span>
                                                    {menu.header}
                                                </span>
                                                <i className="fa fa-angle-right pull-right"></i>
                                            </a>
                                        </li>
                                    )
                                })
                            }


                        </ul>
                    </section>

                    <div id="mySidenav" className={subNavClassName}>
                        
                        <a href="javascript:void(0)" className="closebtn" onClick={this.closeSubNav}>&times;</a>
                        <ul className="vertical-nav">
                        <li><a>80% 7 ต.ค 58</a></li>
                        <li><a>70% 9 ต.ค 57</a></li>
                        <li><a>60% 2 ต.ค 56</a></li>
                        </ul>
                        {/* <ul className="vertical-nav">
                           {
                                subMenuItems && subMenuItems.map((item, index) => {
                                    return (<li><a> {item.name} </a></li>)
                                })
                            }
                        </ul> */}
                        <Collapsible trigger="80% 7 ต.ค 58">
                            <p>7 ต.ค. 58</p>
                            <p>6 ต.ค. 58</p>
                            <p>5 ต.ค. 58</p>
                            <p>4 ต.ค. 58</p>
                            <p>3 ต.ค. 58</p>
                            <p>2 ต.ค. 58</p>
                            <p>1 ต.ค. 58</p>
                          
                        </Collapsible>
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

    
