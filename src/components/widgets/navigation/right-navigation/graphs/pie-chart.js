import React from 'react';
// Chartsjs.
import { Pie } from 'react-chartjs-2';

const pie_data = {
    labels: [
        'Dam 1',
        'Dam 2',
        'Dam 3',
    ],
    datasets: [{
        data: [20.0, 55.0, 25.0],
        backgroundColor: [
            '#FF6384',
            '#2ecc71',
            '#36A2EB'
        ],
        hoverBackgroundColor: [
            '#FA1344',
            '#28AE61',
            '#0C8FE8'
        ],
    }],
};

export default React.createClass({
    displayName: 'Pie_Chart',

    render() {
        return (
            <div>
                <Pie data={pie_data} width={100} />
            </div>
        );
    }
});