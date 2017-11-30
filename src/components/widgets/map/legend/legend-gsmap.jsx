import React, {Component, PropTypes} from 'react';
import LegendControl from '../legend-map';
import './legend.scss'

function getColor(d) {
    return d > 150 ? '#c00000' :
        d > 90 ? '#ff2e07' :
            d > 70 ? '#cc6601' :
                d > 50 ? '#ff8b05' :
                    d > 35 ? '#f8d700' :
                        d > 20 ? '#6ac904' :
                            d > 10 ? '#97e5aa' :
                                d > 0 ? 'rgba(255, 255, 255, 0)' :
                                    '#FFEDA0';
}
class LegendGsMap extends Component {

    // render method of Class
    render() {
        const grades = [0, 10, 20, 35, 50, 70, 90, 150],
            labels = ['Low', 'Medium', 'Medium', 'Heavy', 'Heavy', 'Heavy', 'Very Heavy', 'Very Heavy', 'Very Heavy', 'Very Heavy'];

        const { mapLayer } = this.props;
        return (
            <LegendControl position='bottomright' customClass="absolute animated fadeIn">
                <div className={"info legend "}>
                        Rainfall
                    <div className="legend-container">
                    {
                            grades.map((grade, index) => {
                                return (
                                    <div key={index}>
                                        <span className="info-label"> <span className="label-text">{`${labels[index]}`}</span> </span>
                                        <i style={{ background: getColor(grade + 1) }} >  </i>
                                        <span className="info-grade"> { `${grade} `}   </span>
                                        <br />
                                    </div>)
                            })
                        }
                    </div>
                </div>

            </LegendControl>

        );
    }
}

export default LegendGsMap;
