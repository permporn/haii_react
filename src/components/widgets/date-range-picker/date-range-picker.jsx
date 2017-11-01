import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import './date-range-picker.scss';

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
};

class DateRangePicker extends Component {
  constructor(props) {
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      autoOk: false,
      disableYearSelection: false,
    };
  } 

  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    });
  };

  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date,
    });
  };

/*   handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  }; */

  render() {
    return (
    <div>
        <div style={optionsStyle}>
          <DatePicker
            onChange={this.onDateChange}
            autoOk={this.state.autoOk}
            floatingLabelText="Select Date"
            disableYearSelection={this.state.disableYearSelection}
          />
        </div>
      </div>
    );
  }
}

export default DateRangePicker;