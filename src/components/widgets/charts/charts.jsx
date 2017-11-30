import React, { Component, PropTypes } from 'react';
import Box from 'widgets/box/box'
import { connect } from 'react-redux';
import { BASE_URL_GSMAP, BASE_URL_SST } from 'widgets/map/url/map-image-url';
import NoDataFound from './no-data-found/no-data-found.jsx';
import './charts.scss';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const wrapTextStyle = {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    fontSize: '11px',
    overflow: 'visible'
}

class Charts extends Component {

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
    }

    updateGsMapMatch = (date) => {

    }
    // render method of Class
    render() {
        const { gsMapMatch, sstMapMatch, mapLayer, rainfallForecast, mapType } = this.props;
        return (
            <div>
                {mapType == "FORECAST" ?
                    rainfallForecast.get(0).map((match, index) => {
                        if (index != 'date') {
                            return <div className="row">
                                <div className="col-md-12">
                                    <Box boxTitle={`${Math.round(match.get('average_percent_similarity'))}%`} boxSecondaryTitle={`${match.get('list').getIn([0, 'date_match'])}`} collapsed={true} showMaximizeIcon={false}  >
                                        <div>
                                            <Table className="table-material-ui">
                                                <TableHeader displaySelectAll={false}>
                                                    <TableRow>
                                                        <TableHeaderColumn colSpan={2}> </TableHeaderColumn>
                                                        <TableHeaderColumn style={{ paddingLeft: '0' }}>
                                                            SST </TableHeaderColumn>
                                                        <TableHeaderColumn style={{ paddingLeft: '0' }}>
                                                            GSMAP </TableHeaderColumn>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody displayRowCheckbox={false}>
                                                    {match.get('list').map((matchData, index) => {
                                                        return (
                                                            // <div>
                                                            //     <p className="forecast-item"> {matchData.get('date_match')}  </p>
                                                            //     <p className="forecast-item"> {`${Math.round(matchData.get('sst_percentage'))}%`}  </p>
                                                            //     <p className="forecast-item"> {`${Math.round(matchData.get('gsm_percentage'))}%`}  </p>
                                                            // </div>
                                                            <TableRow>
                                                                <TableRowColumn colSpan={2}>  {matchData.get('date_match')}  </TableRowColumn>
                                                                <TableRowColumn style={{ overflow: 'visible', fontSize: 12 }} >  {`${Math.round(matchData.get('sst_percentage'))}%`}  </TableRowColumn>
                                                                <TableRowColumn style={{ overflow: 'visible', fontSize: 12 }}> {`${Math.round(matchData.get('gsm_percentage'))}%`}  </TableRowColumn>
                                                            </TableRow>
                                                        )
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </Box>
                                </div>
                            </div>
                        }

                    })
                    : null
                }
            </div>
        );
    }
}
Charts.contextTypes = {
    history: PropTypes.object
};
const mapStateToProps = ({ mapData }) => ({
    gsMapMatch: mapData.get('gsMapMatch'),
    sstMapMatch: mapData.get('sstMapMatch'),
    mapLayer: mapData.get('mapLayer'),
    rainfallForecast: mapData.get('rainfallForecast')
});
Charts = connect(mapStateToProps, null)(Charts);
export default Charts;
