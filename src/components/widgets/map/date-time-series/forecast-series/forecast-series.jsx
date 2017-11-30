import React, {Component} from 'react';
import Slider from 'material-ui/Slider';
import {FORECAST_LIMIT}  from '../../map-const';
import './forecast-series.scss';


class ForeCastSeries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: new Date(),
            activeDate: 1
        }
        Date.prototype.getMonthText = function () {
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months[this.getMonth()];
        }
    }

    //Lifecycle Hooks

    //Component Functions
    dragStart = (e) => {
        window.map.dragging.disable();
    }
    dragStop = (e) => {
        window.map.dragging.enable();
    }
    handleSlider = (event, value) => {
        this.setState({
            activeDate: value
        })
    }
    renderDates = () => {
        let i = FORECAST_LIMIT;
        let {currentDate} = this.state;
        let yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date);
        let dateArray = [];
        let count = 0;
        while (i >= 0) {
            if (yesterday.getDate()== currentDate.getDate() ) {
                if(count == this.state.activeDate){
                    dateArray.push(<li className="current-date animated pulse">  Today  </li>);
                }
                else{
                    dateArray.push(<li>  Today  </li>);
                }
            }
            else {
                if(count == this.state.activeDate){
                    dateArray.push(<li  className="current-date animated pulse" > { yesterday.getDate() < 10 ? '0' + yesterday.getDate() : yesterday.getDate() } { yesterday.getMonth() } { yesterday.getFullYear() } </li>);
                }
                else{
                    dateArray.push(<li>  { yesterday.getDate() < 10 ? '0' + yesterday.getDate() : yesterday.getDate() } { yesterday.getMonth() } { yesterday.getFullYear()  } </li>);
                }
            }
            yesterday.setDate(yesterday.getDate() + 1 );
            count++;
            i = i - 1;
        }
        return dateArray;
    }

    render() {
        return (
            <div id="time-slider-dates">
                <div className="time-slider-wrapper">
                    <div className="time-slider">
                        <ul className="slider-list slider-header">
                            {this.renderDates()}
                        </ul>
                        <Slider defaultValue={this.state.activeDate} className="slider" onChange={this.handleSlider}
                                step={1} onDragStop={this.dragStop}
                                onDragStart={this.dragStart} min={0} max={FORECAST_LIMIT}/>
                        <ul className="slider-list slider-header">
                            {this.renderDates()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default ForeCastSeries;