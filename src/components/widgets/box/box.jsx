import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

class Box extends Component {

    static defaultProps = {
        showMaximizeIcon: false
    }

    constructor(props) {
        super(props);
        this.state = {
            collapsed: this.props.collapsed
        }
    }
    toggleColapse = () => {
        const { collapsed } = this.state;
        this.setState({
            collapsed: !collapsed
        })
    }
    // render method of Class
    render() {
        const { collapsed } = this.state;
        const { showMaximizeIcon } = this.props;
        const boxClassName = classNames("box box-default", { "collapsed-box": collapsed == true });
        const iconClassName = classNames({ "fa fa-plus": collapsed == true },
            { "fa fa-minus": collapsed == false }
        )
        return (
            <div className={boxClassName}>
                <div className="box-header with-border">
                    <h3 className="box-title">{this.props.boxTitle}</h3>
                    <div className="box-tools pull-right">
                        {showMaximizeIcon == true ? <span onClick={this.props.showCompleteView}  className="btn btn-box-tool" ><i className="fa fa-th-large"></i>
                        </span> : null}
                        <span onClick={this.toggleColapse} className="btn btn-box-tool" ><i className={iconClassName}></i>
                        </span>
                    </div>

                </div>

                <div className="box-body" >
                    {this.props.children}
                </div>

            </div>

        );
    }
}
Box.contextTypes = {
    history: PropTypes.object
};

export default Box;
