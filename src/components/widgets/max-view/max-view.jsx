import React, { Component, PropTypes } from 'react';
import MaterialDialog from 'widgets/dialog/material-dialog';

class MaximizeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewType : this.props.viewType
        }
    }
    // render method of Class
    render() {
        const { viewType } = this.props;
        return (
            <div>
                <MaterialDialog title="Pie chart" open={this.props.showCompleteView} handleClose={this.props.handleClose} >
                Test
                </MaterialDialog>
            </div>
        );
    }
}
MaximizeView.contextTypes = {
    history: PropTypes.object
};

export default MaximizeView;
