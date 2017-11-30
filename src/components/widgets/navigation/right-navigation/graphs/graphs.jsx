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
import { BASE_URL_GSMAP , BASE_URL_SST } from 'widgets/map/url/map-image-url';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';


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
    updateGsMapMatch = (date) => {
      
    }
    // render method of Class
    render() {
        let pieData = [
            { label: 'Dam 1', value: 20.0 },
            { label: 'Dam 2', value: 55.0 },
            { label: 'Dam 3', value: 25.0 }
        ];
        const { viewType, showCompleteView } = this.state;
        const { gsMapMatch, sstMapMatch, mapLayer } = this.props;
        return (
            <div>
                {mapLayer == "GSMAPMATCH" ? <div className="row">
                    <div className="col-md-12">
                        <Paper style={{ padding: '20px' }} zDepth={2} >
                            GSMAP match
                            <Table
                                height={this.state.height}
                                fixedHeader={this.state.fixedHeader}
                                fixedFooter={this.state.fixedFooter}
                                selectable={this.state.selectable}
                                multiSelectable={this.state.multiSelectable}
                            >
                                <TableHeader
                                    displaySelectAll={this.state.showCheckboxes}
                                    adjustForCheckbox={this.state.showCheckboxes}
                                    enableSelectAll={this.state.enableSelectAll}
                                >
                                    <TableRow>
                                        <TableHeaderColumn colSpan={2} >Date</TableHeaderColumn>
                                        <TableHeaderColumn >GS</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={this.state.showCheckboxes}
                                    deselectOnClickaway={this.state.deselectOnClickaway}
                                    showRowHover={this.state.showRowHover}
                                    stripedRows={this.state.stripedRows}
                                >
                                    {
                                        gsMapMatch.map((data, index) => {
                                            let date = Object.keys(data)[0];
                                            if (date) {
                                                let year = date.substring(0, 4);
                                                let mon = date.substring(4, 6);
                                                let dat = date.substring(6, 8);
                                                return (<TableRow style={{ color: '#696969' }} >
                                                    <TableRowColumn colSpan={2} style={{
                                                        whiteSpace: 'normal',
                                                        wordWrap: 'break-word'
                                                    }}>{mon} {dat}</TableRowColumn>
                                                    <TableRowColumn  ><a onClick={() =>this.updateGsMapMatch(date)} href="#">...</a></TableRowColumn>
                                                </TableRow>)
                                            }

                                        })
                                    }


                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableRowColumn colSpan="2" style={{ textAlign: 'center' }}>

                                        </TableRowColumn>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </Paper>
                    </div>
                </div> : null}
                {mapLayer == "SSTMATCH" ? <div className="row">
                    <div className="col-md-12">
                        <Paper style={{ padding: '20px' }} zDepth={2} >
                            SST match
                            <Table
                                height={this.state.height}
                                fixedHeader={this.state.fixedHeader}
                                fixedFooter={this.state.fixedFooter}
                                selectable={this.state.selectable}
                                multiSelectable={this.state.multiSelectable}
                            >
                                <TableHeader
                                    displaySelectAll={this.state.showCheckboxes}
                                    adjustForCheckbox={this.state.showCheckboxes}
                                    enableSelectAll={this.state.enableSelectAll}
                                >
                                    <TableRow>
                                        <TableHeaderColumn >Date</TableHeaderColumn>
                                        <TableHeaderColumn >SST</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={this.state.showCheckboxes}
                                    deselectOnClickaway={this.state.deselectOnClickaway}
                                    showRowHover={this.state.showRowHover}
                                    stripedRows={this.state.stripedRows}
                                >
                                    {
                                        sstMapMatch.map((data, index) => {
                                            let date = Object.keys(data)[0];
                                            if (date) {
                                                let year = date.substring(0, 4);
                                                let mon = date.substring(4, 6);
                                                let dat = date.substring(6, 8);
                                                return (<TableRow style={{ color: '#696969' }} >
                                                    <TableRowColumn colSpan={2} style={{
                                                        whiteSpace: 'normal',
                                                        wordWrap: 'break-word'
                                                    }}>{mon} {dat}</TableRowColumn>
                                                    <TableRowColumn >...</TableRowColumn>
                                                </TableRow>)
                                            }

                                        })
                                    }

                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableRowColumn colSpan="2" style={{ textAlign: 'center' }}>

                                        </TableRowColumn>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </Paper>
                    </div>
                </div> : null}
                {mapLayer == "COMBINEDMATCH" ? <div className="row">
                    <div className="col-md-12">
                        <Paper style={{ padding: '20px' }} zDepth={2} >
                            COMBINED match
                            <Table
                                height={this.state.height}
                                fixedHeader={this.state.fixedHeader}
                                fixedFooter={this.state.fixedFooter}
                                selectable={this.state.selectable}
                                multiSelectable={this.state.multiSelectable}
                            >
                                <TableHeader
                                    displaySelectAll={this.state.showCheckboxes}
                                    adjustForCheckbox={this.state.showCheckboxes}
                                    enableSelectAll={this.state.enableSelectAll}
                                >
                                    <TableRow>
                                        <TableHeaderColumn >Date</TableHeaderColumn>
                                        <TableHeaderColumn >Combined</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={this.state.showCheckboxes}
                                    deselectOnClickaway={this.state.deselectOnClickaway}
                                    showRowHover={this.state.showRowHover}
                                    stripedRows={this.state.stripedRows}
                                >
                                    <TableRow style={{ color: '#696969' }} >
                                        <TableRowColumn style={{
                                            whiteSpace: 'normal',
                                            wordWrap: 'break-word'
                                        }}>1</TableRowColumn>
                                        <TableRowColumn style={{
                                            whiteSpace: 'normal',
                                            wordWrap: 'break-word'
                                        }}>view</TableRowColumn>
                                    </TableRow>

                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableRowColumn colSpan="2" style={{ textAlign: 'center' }}>

                                        </TableRowColumn>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </Paper>
                    </div>
                </div> : null}
                <div className="row">
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
                </div>


                <div className="row">
                    <div key="RAIN_LEVEL_BOX" className="col-md-12">
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
