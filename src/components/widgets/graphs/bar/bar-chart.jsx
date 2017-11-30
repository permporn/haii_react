import { Bar } from 'react-chartjs-2';


import React, { Component, PropTypes } from 'react';

class BarChart extends Component {

    render() {
        let labels =[];
        let data = [];
        this.props.data.forEach((content) =>{
            labels.push(content.get('station'));
            data.push(content.get('y'));
        }, this);
   
        const bar_data = {
            labels: labels,
            datasets: [
                {
                    label: this.props.label,
                    backgroundColor: 'rgba(10,61,173,0.9)',
                    borderColor: 'rgba(61,145,241,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(61,145,241,0.4)',
                    hoverBorderColor: 'rgba(61,145,241,1)',
                    data: data
                }
            ]
        };
        return (
            <div>
                <Bar
                    data={bar_data}
                    width={100}
                    height={200}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
}


export default BarChart;