import './gs-sst-series.scss';
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { DAYS_LIMIT } from '../../map-const';
import L from 'leaflet';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';

class GsSSTSeries extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            previousDays: [],
            nextDays: [],
            prvLastDate: new Date(),
            nextLastDate: new Date(),
            selectedDate: new Date()
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
        window.map.doubleClickZoom.disable();
        this.setState({
            selectedDate: new Date(date),
            selectedIndex: index
        });
        this.renderPreviousDatesFromDate(date);
        this.renderNextDatesFromDate(date);
        this.props.updateMapImage(date);

        setTimeout(() => window.map.doubleClickZoom.enable(), 100);
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
            const month = date.getMonth();
            const dat = ("0" + date.getDate()).slice(-2);
            days.push(<li key={ i } onClick={() => this.select(i, `${date.getFullYear()}/${mon}/${dat}`)}> <a href="#"> {`${dat} ${month}`} </a> </li>);
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
            const month = date.getMonth();
            const dat = ("0" + date.getDate()).slice(-2);
            days.push(<li key={ i } onClick={() => this.select(i, `${date.getFullYear()}/${mon}/${dat}`)}> <a href="#"> {`${dat} ${month}`} </a></li>);
            i = i - 1;
            if (i == 0)
                lastDate = date;
        }
        this.setState({
            nextDays: days,
            nextLastDate: lastDate
        })
    }
    renderSelectedDate = () => {
        const { selectedDate } = this.state;
        let date = selectedDate;
        const month = date.getMonth();
        const mon = ("0" + (date.getMonth() + 1)).slice(-2);
        const dat = ("0" + date.getDate()).slice(-2);
        return (<li className="current-date"> <a href="#"> {`${dat} ${month}  ${date.getFullYear().toString()}`} </a> </li>);
    }
    renderPrevious = () => {
        window.map.doubleClickZoom.disable();
        this.renderPreviousDatesFromDate(this.state.prvLastDate);
        setTimeout(() => window.map.doubleClickZoom.enable(), 100);
    }
    renderNext = () => {
        window.map.doubleClickZoom.disable();
        this.renderNextDatesFromDate(this.state.nextLastDate);
        setTimeout(() => window.map.doubleClickZoom.enable(), 100);
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
                        <li onClick={this.renderPrevious} ><a className="rounded-left"><i className="ti-angle-left"></i></a></li>
                        {previousDays}
                        {this.renderSelectedDate()}
                        {nextDays}
                        <li onClick={this.renderNext} ><a className="no-border rounded" href="#"><i className="ti-angle-right"></i></a></li>
                    </ul>
                </div>



                {/* <div className="slidecontainer">
            <input type="range" min="1" max="100" value="50" className="slider" id="myRange"/>
            <p>Value: <span id="demo"></span></p>
            </div> */}
            </div>


        );
    }
}
export default GsSSTSeries;
