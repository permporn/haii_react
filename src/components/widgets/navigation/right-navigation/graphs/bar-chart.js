import React from 'react';
// Chartsjs.
import { Bar } from 'react-chartjs-2';

const bar_data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Rain Fall',
            backgroundColor: 'rgba(61,145,241,0.2)',
            borderColor: 'rgba(61,145,241,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(61,145,241,0.4)',
            hoverBorderColor: 'rgba(61,145,241,1)',
            data: [
                0.26789611283279424,
                0.938722048681125,
                0.014511315562131895,
                0.6777968350341455,
                1.402853678778828,
                0.3709902985604339,
                2.5285657626539253,
            ]
        }
    ]
};

export default React.createClass({
    displayName: 'Bar_Chart',

    render() {
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
});