import React, {Component} from 'react';
import Slider from 'material-ui/Slider';
import './rainfall-series.scss';

import { LIMIT, DAYS_LIMIT }   from '../../map-const';


class RainFallSeries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            previousDays: [],
            nextDays: [],
            prvLastDate: new Date(),
            nextLastDate: new Date(),
            selectedDate : new Date()
        };
        Date.prototype.getMonthText = function () {
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months[this.getMonth()];
        }
    }
    //Lifecycle Hooks
    componentDidMount() {
        this.renderPreviousDatesFromDate(new Date());
        this.renderNextDatesFromDate(new Date());
    }
    //Component Functions
    dragStart = (e) => {
        window.map.dragging.disable();
    }
    dragStop = (e) => {
        window.map.dragging.enable();
    }
    handleSlider = (event, value) => {
        console.log(value);
    }
    select = (index, date) => {
        this.setState({
            selectedDate : new Date(date),
            selectedIndex: index
        });
        this.renderPreviousDatesFromDate(date);
        this.renderNextDatesFromDate(date);
        this.props.updateMapImage(date)
    }
    renderPrevious = () => {
        this.renderPreviousDatesFromDate(this.state.prvLastDate);
    }
    renderNext = () => {
        this.renderNextDatesFromDate(this.state.nextLastDate);
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
            days.push(<li key={i} onClick={() => this.select(i, `${date.getFullYear()}/${mon}/${dat}`)}> <a href="#"> {`${dat} ${month}`} </a> </li>);
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
            days.push(<li key={i} onClick={() => this.select(i, `${date.getFullYear()}/${mon}/${dat}`)}> <a href="#"> {`${dat} ${month}`} </a></li>);
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
        const month = date.getMonthText();
        const mon = ("0" + (date.getMonth() + 1)).slice(-2);
        const dat = ("0" + date.getDate()).slice(-2);
        return (<li className="current-date" onClick={() => this.select(i, `${date.getFullYear()}/${mon}/${dat}`)}> <a className="animated infinite pulse" href="#"> {`${dat} ${month},  ${date.getFullYear().toString()}`} </a> </li>);
    }
    renderTime = () => {
        let i = LIMIT;
        let hourArray = [];
        while (i >= 0) {
            hourArray.push(
                <li key={i}> {i < 10 ? '0'+i :  i} </li>
            )
            i = i - 1;
        }
        console.log(hourArray);
        return hourArray.reverse();
    }

    render() {
        const { previousDays, nextDays } = this.state;
        return (
            <div id="time-slider">
                <div className="time-slider-wrapper">
                    <div className="time-slider">
                        <ul className="slider-list slider-header">
                            {this.renderTime()}
                        </ul>
                        <Slider className="slider" onChange={this.handleSlider} step={1} onDragStop={this.dragStop}
                                onDragStart={this.dragStart} min={0} max={LIMIT}/>
                        <ul className="slider-list slider-footer">
                            <li onClick={this.renderPrevious} > <a className="rounded-left"><i className="ti-angle-left"></i></a></li>
                            <ul>
                               {previousDays}
                           </ul>
                            <ul>
                                {this.renderSelectedDate()}
                            </ul>
                            <ul>
                                {nextDays}
                            </ul>
                            <li onClick={this.renderNext} > <a className="no-border rounded" href="#"><i className="ti-angle-right"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default RainFallSeries;