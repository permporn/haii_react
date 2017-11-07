import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import './date-range-picker.scss';

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
};

class DateRangePicker extends Component {
  static defaultProps = {
    time: new Date("Aug 1, 2017 07:00"),
    date: new Date("Aug 1, 2017")
  }
  constructor(props) {
    super(props);

    this.state = {
      autoOk: false,
      disableYearSelection: false,
      date: this.props.date,
      time: this.props.time
    };
  }
  onDateChange = (e, date) => {
    this.setState({
      date
    })
    this.props.updateDate(date);
  }
  handleTimeChange = (e, time) => {
    this.props.updateTime(time);
  }

  render() {
    const { time, date } = this.state;
    return (
      <div>
        <div style={optionsStyle}>
          <DatePicker
            onChange={this.onDateChange}
            autoOk={this.state.autoOk}
            value={date}
            floatingLabelText="Select Date"
            disableYearSelection={this.state.disableYearSelection}
          />
          <TimePicker
            format="24hr"
            hintText="Select Time"
            minutesStep={60}
            value={time}
            onChange={this.handleTimeChange}
          />
        </div>
      </div>
    );
  }
}

export default DateRangePicker;