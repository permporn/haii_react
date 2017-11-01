import './right-navigation-menu.scss';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { RIGHT_LIST } from './right-list';

class RightMinNavigationMenu extends Component {

    constructor(props) {
        super(props);

    }
    maximizeRightNav = () => {
        this.props.toggleRightNav();
    }

    // render method of Class
    render() {
        const showRightNav = this.props.siteLayout.get('showRightNav');
        return (
            showRightNav == false ? <aside className="control-sidebar control-sidebar-dark control-sidebar-open  minimize">

                <i onClick={this.maximizeRightNav} className="material-icons hidenav">keyboard_arrow_left</i>
                <ul className="control-sidebar-menu">
                    {
                        RIGHT_LIST.map((menu, index) => {
                            return (<li>
                                <a href="#" data-toggle="tooltip" data-placement="right" title={menu.header}>

                                    <i className={menu.iconClassName}></i>


                                </a>
                            </li>
                            )
                        })

                    }


                </ul>
            </aside> : null
        );
    }
}
RightMinNavigationMenu.contextTypes = {
    history: PropTypes.object
};

export default RightMinNavigationMenu;
