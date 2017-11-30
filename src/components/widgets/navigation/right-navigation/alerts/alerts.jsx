import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import Box from 'widgets/box/box'
import './alerts.scss';

class Alerts extends Component {
    // render method of Class
    render() {
        return (
            <div>
                <div className="row grid-margin">
                    <div className="col-md-12">
                        <fieldset className="scheduler-border">
                            <legend className="scheduler-border">Alert 24 hrs</legend>
                            <div className="control-group">
                                <Box boxTitle="Warnings" collapsed={false} showMaximizeIcon={false}  >
                                    <ul className="products-list product-list-in-box">
                                        <li className="item">
                                            <div className="product-info">
                                                <a href="javascript:void(0)" className="product-title">Province
                                                     <span className="label label-warning pull-right">1800</span></a>
                                                <span className="product-description">
                                                    จ.พิษณุโลก
                                             </span>
                                            </div>
                                        </li>
                                        <li className="item">
                                            <div className="product-info">
                                                <a className="product-title">Province<span className="label label-warning  pull-right">500</span></a>
                                                <span className="product-description">
                                                    จ.ลำปาง
                                              </span>
                                            </div>
                                        </li>
                                    </ul>

                                </Box>
                                <Box boxTitle="Critical" collapsed={false} showMaximizeIcon={false}  >
                                    <ul className="products-list product-list-in-box">
                                        <li className="item">
                                            <div className="product-info">
                                                <a href="javascript:void(0)" className="product-title">Province
                                                     <span className="label label-danger pull-right">1800</span></a>
                                                <span className="product-description">
                                                    จ.พิษณุโลก
                                             </span>
                                            </div>
                                        </li>
                                        <li className="item">
                                            <div className="product-info">
                                                <a className="product-title">Province<span className="label label-danger  pull-right">500</span></a>
                                                <span className="product-description">
                                                    จ.ลำปาง
                                              </span>
                                            </div>
                                        </li>
                                    </ul>

                                </Box>

                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="row grid-margin">
                    <div className="col-md-12">
                        <fieldset className="scheduler-border">
                            <legend className="scheduler-border">Alert 3 days</legend>
                            <div className="control-group">
                                <Box boxTitle="Warnings" collapsed={false} showMaximizeIcon={false}  >
                                    <ul className="products-list product-list-in-box">
                                        <li className="item">
                                            <div className="product-info">
                                                <a href="javascript:void(0)" className="product-title">Province
                                                     <span className="label label-warning pull-right">1800</span></a>
                                                <span className="product-description">
                                                    จ.พิษณุโลก
                                             </span>
                                            </div>
                                        </li>
                                        <li className="item">
                                            <div className="product-info">
                                                <a className="product-title">Province<span className="label label-warning  pull-right">500</span></a>
                                                <span className="product-description">
                                                    จ.ลำปาง
                                              </span>
                                            </div>
                                        </li>
                                    </ul>

                                </Box>
                                <Box boxTitle="Critical" collapsed={false} showMaximizeIcon={false}  >
                                    <ul className="products-list product-list-in-box">
                                        <li className="item">
                                            <div className="product-info">
                                                <a href="javascript:void(0)" className="product-title">Province
                                                     <span className="label label-danger pull-right">1800</span></a>
                                                <span className="product-description">
                                                    จ.พิษณุโลก
                                             </span>
                                            </div>
                                        </li>
                                        <li className="item">
                                            <div className="product-info">
                                                <a className="product-title">Province<span className="label label-danger  pull-right">500</span></a>
                                                <span className="product-description">
                                                    จ.ลำปาง
                                              </span>
                                            </div>
                                        </li>
                                    </ul>

                                </Box>

                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        );
    }
}
Alerts.contextTypes = {
    history: PropTypes.object
};

export default Alerts;
