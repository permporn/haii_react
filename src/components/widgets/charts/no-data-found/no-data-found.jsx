import React from 'react';
import Box from 'widgets/box/box'
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
    fontSize: '11px'
}

export default React.createClass({

    render() {
        return  (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Box collapsed={false} showMaximizeIcon={false}  >
                            <div>
                                <Table className="table-material-ui">
                                    <TableHeader displaySelectAll={false}>
                                        <TableRow>
                                            <TableHeaderColumn colSpan={2}> </TableHeaderColumn>
                                            <TableHeaderColumn style={{paddingLeft: '0'}} > SST </TableHeaderColumn>
                                            <TableHeaderColumn style={{paddingLeft: '0'}} > GSMAP </TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false}>
                                        <TableRow>
                                            <TableRowColumn colSpan={3}
                                                            style={wrapTextStyle}> <p className="no-data-found"> No Data Found</p>  </TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </Box>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Box collapsed={false} showMaximizeIcon={false}  >
                            <div>
                                <Table className="table-material-ui">
                                    <TableHeader displaySelectAll={false}>
                                        <TableRow>
                                            <TableHeaderColumn colSpan={2}> </TableHeaderColumn>
                                            <TableHeaderColumn style={{paddingLeft: '0'}} > SST </TableHeaderColumn>
                                            <TableHeaderColumn style={{paddingLeft: '0'}} > GSMAP </TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false}>
                                        <TableRow>
                                            <TableRowColumn colSpan={3}
                                                            style={wrapTextStyle}> <p className="no-data-found"> No Data Found</p>  </TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </Box>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Box collapsed={false} showMaximizeIcon={false}  >
                            <div>
                                <Table className="table-material-ui">
                                    <TableHeader displaySelectAll={false}>
                                        <TableRow>
                                            <TableHeaderColumn colSpan={2}> </TableHeaderColumn>
                                            <TableHeaderColumn style={{paddingLeft: '0'}} > SST </TableHeaderColumn>
                                            <TableHeaderColumn style={{paddingLeft: '0'}} > GSMAP </TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false}>
                                        <TableRow>
                                            <TableRowColumn colSpan={3}
                                                            style={wrapTextStyle}> <p className="no-data-found"> No Data Found</p>  </TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        );
    }
});