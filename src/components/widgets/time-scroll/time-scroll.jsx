import './time-scroll.scss';
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { DAYS_LIMIT } from './time-scroll-const';
import L from 'leaflet';

class TimeScroll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        }
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
    // render method of Class
    render() {
        let dates = [];
        dates = this.getDatesForMapData();
        
        const { selectedIndex }  = this.state; 
        return (
                <div  className="scrollmenu">
                    {
                        dates.map((date, index) => {
                            const month = ("0" + (date.getMonth() + 1)).slice(-2);
                            const dat = ("0" + date.getDate()).slice(-2);
                            return (
                                <div  key={index} className={ index== selectedIndex ? 'calendar-date active-menu' :'calendar-date'} onClick={() => this.select(index, `${date.getFullYear()}/${month}/${dat}`) }>
                                    {`${dat}/${month}/${date.getFullYear()}` }
                                </div>
                            )
                        })
                    }
                </div>
        );
    }
}
export default TimeScroll;
