import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './navigation-menu.scss';
import Bars from 'react-icons/lib/fa/bars';
import classNames from 'classnames';
import { MENU_LIST } from './menu-list';
import JsonTable from 'react-json-table';

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
    onSubMenuClicked = (item) => {
        if(item.layer)
        this.props.updateMapLayer(item.layer);
    }

    // render method of Class
    render() {
        var style = {
            display: "block"
        };

        var items = [
            { average_percent_match: 80.0,date: "2014-10-07" },
            { average_percent_match: 70.0,date: "2015-11-11" },
            { average_percent_match: 60.0,date: "2012-09-01" },
            { average_percent_match: 50.0,date: "2014-09-02" }
          ];
        
        var columns = [
            {key: 'average_percent_match', label: ' ', cell: function( item, columnKey ){
                return <span><span className="textBig">{ item.average_percent_match }%</span> { item.date }</span>;
            }}
        ];

        var SelectTable = React.createClass({
            getInitialState: function(){
              // We will store the selected cell and row, also the sorted column
              return {row: false, cell: false, sort: false};
            },  
            render: function(){
              var me = this,
                  // clone the rows
                  items = this.props.rows.slice()
              ;
              // Sort the table
              if( this.state.sort ){
                items.sort( function( a, b ){
                   return a[ me.state.sort ] > b[ me.state.sort ] ? 1 : -1;
                });
              }
                  
              return <JsonTable 
                rows={items} 
                columns={ columns }
                settings={ this.getSettings() } 
                onClickCell={ this.onClickCell }
                onClickHeader={ this.onClickHeader }
                onClickRow={ this.onClickRow } />;
            },
            
            getSettings: function(){
                var me = this;
                // We will add some classes to the selected rows and cells
                return {
                  keyField: 'average_percent_match',
                  cellClass: function( current, key, item){
                    if( me.state.cell == key && me.state.row == item.name )
                      return current + ' cellSelected';
                    return current;
                  },
                  headerClass: function( current, key ){
                      if( me.state.sort == key )
                        return current + ' headerSelected';
                      return current;
                  },
                  rowClass: function( current, item ){
                    if( me.state.row == item.name )
                      return current + ' rowSelected';
                    return current;
                  }
                };
            },
            
            onClickCell: function( e, column, item ){
              this.setState( {cell: column} );
            },
            
            onClickHeader: function( e, column ){
              this.setState( {sort: column} );
            },
            
            onClickRow: function( e, item ){
              this.setState( {row: item.name} );
            }  
          });

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
                            <li className="header">View</li>
                            {
                                MENU_LIST.map((menu, index) => {
                                    const menuClassName = classNames('treeview', { 'active': menuHeaderId == menu.id })
                                    return (
                                        <li onClick={menu.children ? () => this.showSubNav(menu) : () => this.redirectToLink(menu)} className={menuClassName}>
                                            <a href="#" data-toggle="tooltip" data-placement="right" title={pushMainMenu == true ? menu.header : null}>
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
                        <a href="javascript:void(0)" className="closebtn" onClick={this.closeSubNav}>&times; </a>
                        <ul className="vertical-nav">
                            {
                                subMenuItems && subMenuItems.map((item, index) => {
                                    return (<li onClick={()=> {this.onSubMenuClicked(item)}} ><a> {item.name} </a></li>)
                                })
                            }
                        </ul>
                        <JsonTable rows={ items } columns={ columns } />
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
