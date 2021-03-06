import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import Box from 'widgets/box/box'
import { connect } from 'react-redux';
import { PieChart } from 'react-d3';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import MaximizeView from 'widgets/max-view/max-view';
// chartjs
import Pie_Chart from './pie/pie-chart';
import Bar_Chart from './bar/bar-chart';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

class Graphs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showCompleteView: false,
            viewType: '',
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: true,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: false,
            showCheckboxes: false
        }
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
        const { contextualLayer, rainfall24 , waterlevel } = this.props;
        return (
            <div>
                {/* <div className="row">
                    <div className="col-md-12">
                        <Box key="RAIN_BOX" boxTitle="Rain fall" collapsed={false} showMaximizeIcon={true} showCompleteView={() => this.showCompleteView('LINE')} >
                            <Sparklines data={this.sampleData} width={100}>
                                <SparklinesBars color="#41c3f9" />
                            </Sparklines>
                        </Box>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Box key="DAM_BOX" boxTitle="Dam level" collapsed={false} showMaximizeIcon={true} showCompleteView={() => this.showCompleteView('PIE')} >
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
                </div> */}


                {
                    contextualLayer == "RAINFALL" ?
                        <div className="row">
                            <div key="RAIN_LEVEL_BOX" className="col-md-12">
                                <Box boxTitle="Rainfall -24" collapsed={false} showMaximizeIcon={true} showCompleteView={() => this.showCompleteView('PIE')} >
                                    <Bar_Chart label="Rainfall" data={rainfall24} />
                                </Box>

                            </div>
                        </div> : null

                }
                {
                    contextualLayer == "WATERLEVEL" ?
                        <div className="row">
                            <div key="WATER_LEVEL_BOX" className="col-md-12">
                                <Box boxTitle="Water level" collapsed={false} showMaximizeIcon={true} showCompleteView={() => this.showCompleteView('PIE')} >
                                    <Bar_Chart label="Water level" data={rainfall24} />
                                </Box>

                            </div>
                        </div> : null

                }
                <MaximizeView handleClose={this.handleClose} viewType={viewType} showCompleteView={showCompleteView} />
            </div>
        );
    }
}
Graphs.contextTypes = {
    history: PropTypes.object
};
const mapStateToProps = ({ mapData, chartData }) => ({
    mapLayer: mapData.get('mapLayer'),
    rainfall24: chartData.get('rainfall24'),
    waterlevel: chartData.get('waterlevel')
});
Graphs = connect(mapStateToProps, null)(Graphs);
export default Graphs;
