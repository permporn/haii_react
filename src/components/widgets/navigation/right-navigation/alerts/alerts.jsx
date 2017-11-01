import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

class Alerts extends Component {
    // render method of Class
    render() {
        return (
            <div>
                <div className="row nopadding grid-margin">
                    <div className="col-md-12">
                        <div className="card card-statistics">
                            <div className="card-body">
                                <div className="d-flex mb-3">
                                    <div className="text-primary">
                                        <i className="fa fa-clock-o highlight-icon" aria-hidden="true"></i>
                                    </div>
                                    <div className="ml-2 highlight-text">
                                        <p className="card-text">Delay</p>
                                        <p className="statistics-number">80</p>
                                    </div>
                                </div>
                                <p className="text-muted">
                                    <i className="fa fa-refresh text-warning mr-1" aria-hidden="true"></i> Just updated
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row nopadding grid-margin">
                    <div className="col-md-12">
                        <div className="card card-statistics">
                            <div className="card-body">
                                <div className="d-flex mb-3">
                                    <div className="text-primary">
                                        <i className="fa fa-clock-o highlight-icon" aria-hidden="true"></i>
                                    </div>
                                    <div className="ml-2 highlight-text">
                                        <p className="card-text">Delay</p>
                                        <p className="statistics-number">80</p>
                                    </div>
                                </div>
                                <p className="text-muted">
                                    <i className="fa fa-refresh text-warning mr-1" aria-hidden="true"></i> Just updated
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row nopadding grid-margin">
                    <div className="col-md-12">
                        <div className="chart-container">
                            <div className="chart-image">
                                 
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <p className="text-center">
                            <strong>Alerts</strong>
                        </p>

                        <div className="progress-group">
                            <span className="progress-text">Water level</span>
                            <span className="progress-number"><b>160</b>/200</span>

                            <div className="progress sm">
                                <div className="progress-bar progress-bar-aqua" style={{ width: '80%' }}></div>
                            </div>
                        </div>
                        <div className="progress-group">
                            <span className="progress-text">Humidity</span>
                            <span className="progress-number"><b>310</b>/400</span>

                            <div className="progress sm">
                                <div className="progress-bar progress-bar-red" style={{ width: '80%' }}></div>
                            </div>
                        </div>
                        <div className="progress-group">
                            <span className="progress-text">Soil Moisture</span>
                            <span className="progress-number"><b>480</b>/800</span>

                            <div className="progress sm">
                                <div className="progress-bar progress-bar-green" style={{ width: '80%' }}></div>
                            </div>
                        </div>
                        <div className="progress-group">
                            <span className="progress-text">Dam Water level</span>
                            <span className="progress-number"><b>250</b>/500</span>

                            <div className="progress sm">
                                <div className="progress-bar progress-bar-yellow" style={{ width: '80%' }}></div>
                            </div>
                        </div>
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
