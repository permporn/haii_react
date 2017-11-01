import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class MaterialDialog extends Component {
    
    // render method of Class
    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.props.handleClose}
            />
        ];
        return (
            <div>
                <Dialog
                    title={this.props.title}
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    {this.props.children}
                </Dialog>
            </div>
        );
    }
}
MaterialDialog.contextTypes = {
    history: PropTypes.object
};

export default MaterialDialog;
