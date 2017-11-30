import './right-navigation-menu.scss';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import Graphs from './graphs/graphs';
import Alerts from './alerts/alerts';


class RightNavigationMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'ALERTS'
        }

    }
    hideMenu = () => {
        this.props.toggleRightNav();
    }
    changeTab = (selectedTab) => {
        this.setState({
            selectedTab: selectedTab
        })
    }
    // render method of Class
    render() {
        const showMenu = this.props.siteLayout.get('showRightNav');
        const { selectedTab } = this.state;
        const selectedClassName = classNames("active", selectedTab == 'GRAPHS');
        // const className = classNames("control-sidebar control-sidebar-dark",
        //     { 'control-sidebar-open': showMenu == true }
        // )   
        return (
            showMenu == true ? <aside className="control-sidebar control-sidebar-dark control-sidebar-open">
                <div className="box box-small">
                    <div className="box-header with-border">
                        <h3 className="box-title nav-title"><b>Alerts</b></h3>
                        <div className="box-tools pull-right">
                            <div onClick={this.hideMenu} className="btn btn-box-tool" ><i className="fa fa-times"></i></div>
                        </div>
                    </div>
                </div>
                {/* <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
                    <li className={classNames({ "active": selectedTab == 'ALERTS' })} ><a onClick={() => this.changeTab('ALERTS')}><i className="fa fa-bell-o"></i></a></li>
                </ul> */}

                <div className="tab-content right-menu-scroll">
                    <div className="tab-pane active">
                       {
                           selectedTab == 'GRAPHS' ? null : <Alerts />
                       }
                    </div>


                </div>
            </aside> : null
        );
    }
}
RightNavigationMenu.contextTypes = {
    history: PropTypes.object
};

export default RightNavigationMenu;
