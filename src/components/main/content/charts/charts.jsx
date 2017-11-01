import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import BarChart from 'react-bar-chart';
import './charts.scss';
import { Sparklines, SparklinesBars, SparklinesLine, SparklinesNormalBand } from 'react-sparklines';

const data = [
    { text: 'Man', value: 500 },
    { text: 'Woman', value: 300 }
];
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

class Charts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: []
        }
    }

    handleBarClick = (element, id) => {
        console.log(`The bin ${element.text} with id ${id} was clicked`);
    }
    componentDidMount() {
        const { chartData } = this.state;
        const { hBaseDamChartData } = this.props;
        if (hBaseDamChartData.size > 0) {
            hBaseDamChartData.get('rows').map((dam, index) => {
                const date = new Date(dam.get('dam_date'));
                const month = ("0" + (date.getMonth() + 1)).slice(-2);
                const dat = ("0" + date.getDate()).slice(-2);
                if (dam.get('dam_inflow') > 0)
                    chartData.push({
                        text: `${dat}/${month}`,
                        value: dam.get('dam_inflow')
                    })
            })
            this.setState({
                chartData
            })
        }

    }
    render() {
        const { chartData } = this.state;
        return (
            <div className="row">
                <section className="col-lg-9 connectedSortable ui-sortable" >
                    <div className="box box-primary">
                        <div className="box-body" >
                            <div className="box-header with-border">
                                <div className="box-title">  <h3>  Dam: ห้วยเดียก อ.เมือง  - 2013 </h3> </div>
                            </div>

                            <div ref='root'>
                                <div style={{ width: '100%' }}>
                                    <BarChart 
                                        ylabel='Water uses'
                                        width={900}
                                        height={500}
                                        margin={margin}
                                        data={chartData}
                                        onBarClick={this.handleBarClick} />

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

Charts.propTypes = {
    wrapClassName: PropTypes.string
};
const mapStateToProps = ({ mapData }) => ({
    hBaseDamChartData: mapData.get('hBaseDamChartData')
});

function mapDispatchToProps(dispatch) {

}
Charts = connect(mapStateToProps, mapDispatchToProps)(Charts);

export default Charts;
