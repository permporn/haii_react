import './time-scroll.scss';
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { DAYS_LIMIT } from './time-scroll-const';
import L from 'leaflet';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

class TimeScroll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            previousDays: [],
            nextDays: [],
            prvLastDate: new Date(),
            nextLastDate: new Date()
        }
        Date.prototype.getMonthText = function () {
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months[this.getMonth()];
        }
    }
    componentDidMount() {
        this.renderPreviousDatesFromDate(new Date());
        this.renderNextDatesFromDate(new Date());
    }
    select = (index, date) => {
        this.setState({
            selectedIndex: index
        })
        this.props.updateMapImage(date)
    }
    getDatesForMapData = () => {
        let msec = Date.parse("Aug 1, 2017");
        let date = new Date(msec);
        var days = [];
        let i = DAYS_LIMIT;
        while (i >= 0) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
            i = i - 1;
        }
        return days;
    }
    renderPreviousDatesFromDate = (dat) => {
        let date = new Date(dat);
        var days = [];
        let i = DAYS_LIMIT;
        let lastDate;
        while (i >= 0) {
            date.setDate(date.getDate() - 1);
            const mon = ("0" + (date.getMonth() + 1)).slice(-2);
            const month = date.getMonthText();
            const dat = ("0" + date.getDate()).slice(-2);
            days.push(<li onClick={() => this.select(i, `${date.getFullYear()}/${mon}/${dat}`)}> <a href="#"> {`${month} ${dat}`} </a> </li>);
            i = i - 1;
            if (i == 0)
                lastDate = date;
        }
        days.reverse();
        this.setState({
            previousDays: days,
            prvLastDate: lastDate
        })
    }
    renderNextDatesFromDate = (dat) => {
        let date = new Date(dat);
        var days = [];
        let i = DAYS_LIMIT;
        let lastDate;
        while (i >= 0) {
            date.setDate(date.getDate() + 1);
            const mon = ("0" + (date.getMonth() + 1)).slice(-2);
            const month = date.getMonthText();
            const dat = ("0" + date.getDate()).slice(-2);
            days.push(<li onClick={() => this.select(i, `${date.getFullYear()}/${mon}/${dat}`)}> <a href="#"> {`${month} ${dat}`} </a></li>);
            i = i - 1;
            if (i == 0)
                lastDate = date;
        }
        this.setState({
            nextDays: days,
            nextLastDate: lastDate
        })
    }
    renderCurrentDate = () => {
        let date = new Date();
        const month = date.getMonthText();
        const mon = ("0" + (date.getMonth() + 1)).slice(-2);
        const dat = ("0" + date.getDate()).slice(-2);
        return (<li className="current-date" > <a href="#"> Aug 02 17 </a> </li>);
        //return (<li className="current-date" onClick={() => this.select(i, `${date.getFullYear()}/${mon}/${dat}`)}> <a href="#"> {`${month} ${dat} ${date.getFullYear().toString().substr(-2)}`} </a> </li>);
    }
    renderPrevious = () => {
        this.renderPreviousDatesFromDate(this.state.prvLastDate);
    }
    renderNext = () => {
        this.renderNextDatesFromDate(this.state.nextLastDate);
    }
    // render method of Class
    render() {
        let dates = [];
        const { previousDays, nextDays } = this.state;
        dates = this.getDatesForMapData();

        const { selectedIndex } = this.state;
        return (
           <div className="pagi-panel">
                <div className="col-lg-12">
                    <ul className="pagination pagination-sm justify-content-center">
                        <li onClick={this.renderPrevious} ><a ><i className="ti-angle-left"></i></a></li>
                        {previousDays}
                        {this.renderCurrentDate()}

                        {nextDays}
                        <li onClick={this.renderNext} ><a className="no-border" href="#"><i className="ti-angle-right"></i></a></li>
                    </ul>
                </div>
            </div>

        );
    }
}
export default TimeScroll;
