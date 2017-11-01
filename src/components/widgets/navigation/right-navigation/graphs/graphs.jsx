import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import Box from 'widgets/box/box'
import { PieChart } from 'react-d3';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import MaximizeView from '../max-view/max-view';
// chartjs
import Pie_Chart from '../../right-navigation/graphs/pie-chart';
import Bar_Chart from '../../right-navigation/graphs/bar-chart';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';


class Graphs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showCompleteView: false,
            viewType: ''
        }
        // Test data for the chart.
        this.sampleData = [
            0.26789611283279424,
            0.938722048681125,
            0.014511315562131895,
            0.6777968350341455,
            1.402853678778828,
            0.3709902985604339,
            2.5285657626539253,
            0.8578243085059141,
            1.7395812075504404,
            0.9723534409914075,
            1.153081489500828,
            1.3851189843556257,
            0.19355625368483506,
            1.262069965103209
        ];
    }
    handleClose = () => {
        this.setState({
            showCompleteView: false
        })
    }
    showCompleteView = (viewType) => {
        this.setState({
            viewType,
            showCompleteView: true

        })
    }
    // render method of Class
    render() {
        let pieData = [
            { label: 'Dam 1', value: 20.0 },
            { label: 'Dam 2', value: 55.0 },
            { label: 'Dam 3', value: 25.0 }
        ];
        const { viewType, showCompleteView } = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Box boxTitle="Rain fall" collapsed={false} showMaximizeIcon={true} showCompleteView={() => this.showCompleteView('LINE')} >
                            <Sparklines data={this.sampleData} width={100}>
                                <SparklinesBars color="#41c3f9" />
                            </Sparklines>
                        </Box>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Box boxTitle="Dam level" collapsed={false} showMaximizeIcon={true} showCompleteView={() => this.showCompleteView('PIE')} >
                            <PieChart
                                data={pieData}
                                width={190}
                                height={190}
                                radius={50}
                                innerRadius={10}
                                title="Pie Chart"
                            />
                        </Box>

                    </div>
                </div>
              
                <div className="row">
                    <div className="col-md-12">
                        <Box boxTitle="Dam Level" collapsed={false} showMaximizeIcon={true} showCompleteView={() => this.showCompleteView('PIE')} >
                            <Pie_Chart />
                        </Box>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Box boxTitle="Rain - level" collapsed={false} showMaximizeIcon={true} showCompleteView={() => this.showCompleteView('PIE')} >
                            <Bar_Chart />
                        </Box>

                    </div>
                </div>
                <MaximizeView handleClose={this.handleClose} viewType={viewType} showCompleteView={showCompleteView} />
            </div>
        );
    }
}
Graphs.contextTypes = {
    history: PropTypes.object
};

export default Graphs;
