import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import NavigationMenu from 'widgets/navigation/navigation-menu';
import RightNavigation from 'widgets/navigation/right-navigation/right-navigation';
import HeaderBar from 'widgets/header/header-bar';
import DateRangePicker from 'widgets/date-range-picker/date-range-picker';
import { toggleRightNav , pushMainMenu } from 'actions/siteLayout.action';
import { bindActionCreators } from 'redux';
import L from 'leaflet';

import './main.scss';

class Content extends Component {
    constructor(props) {
        super(props);
    }
    pushMenu = () => {
        this.props.pushMainMenu();
        setTimeout(function(){ window.map.invalidateSize() }, 1000);
    }
    render() {
        const { siteLayout } = this.props;
        const mainClassName = classNames('skin-dark-blue sidebar-mini wysihtml5-supported',
         {'sidebar-collapse' : siteLayout.get('pushMainMenu') == true} ,
         { "control-sidebar-open" : siteLayout.get('showRightNav') == true }
      )
         const contentWrapperClassName = classNames('content-wrapper', 
          {'right-nav-collapse' :  siteLayout.get('showRightNav') == false }
        )
        return (
            <div className={mainClassName}>
                <div className="wrapper">
                    <HeaderBar pushMenu={this.pushMenu} />
                    <NavigationMenu pushMainMenu={siteLayout.get('pushMainMenu')} />
                    <RightNavigation toggleRightNav={this.props.toggleRightNav} siteLayout={this.props.siteLayout} />
                    <div className={contentWrapperClassName}>
                        <section className="content-header">

                            {/*<ol className="breadcrumb">
    								<li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
    								<li className="active">Dashboard</li>
    							</ol>*/}
                            {this.props.children}
                        </section>

                        <section className="content">
                            <div className="row">

                            </div>
                        </section>
                        {/*                     <div className="date-range-container">
                    <DateRangePicker />
                    </div> */}
                    </div>

                </div>
            </div>
        );
    }
}

Content.contextTypes = {

};

Content.propTypes = {
    wrapClassName: PropTypes.string
};

const mapStateToProps = ({ siteLayout }) => ({
    siteLayout: siteLayout
});

function mapDispatchToProps(dispatch) {
    return {
        toggleRightNav: bindActionCreators(toggleRightNav, dispatch),
        pushMainMenu: bindActionCreators(pushMainMenu,dispatch)
    }
}
Content = connect(mapStateToProps, mapDispatchToProps)(Content);
export default Content;
