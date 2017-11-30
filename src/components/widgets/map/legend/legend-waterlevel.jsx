import React, { Component, PropTypes } from 'react';
import LegendControl from '../legend-map';
import './legend.scss'

function getColor(d) {
    return d > 100 ? '#FF0000' :
        d > 70 ? '#003CFA' :
            d > 30 ? '#00B050' :
                d > 10 ? '#FFC000' :
                    d > 0 ? '#DB802B'
                        : '#990000';
}
class LegendWaterLevel extends Component {

    // render method of Class
    render() {
        const grades = [0, 10, 30, 70, 100],
            labels = ['Very Low', 'Low', 'Normal', 'High', 'Very High'];
        const { mapLayer } = this.props;

        return (
            <LegendControl position='bottomright' customClass="absolute animated fadeIn">
                <div className={"info legend "}>
                    Water level
                   <div className="legend-container" >
                       {
                           grades.map((grade, index) => {
                               // return (<div> <i style={{ background: getColor(grade + 1) }} >  </i>  {grades[index + 1] != undefined ? `${grade}-${grades[index + 1]} ${labels[index]}` : `${grade} + ${labels[index]}`}  <br /></div>)
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

export default LegendWaterLevel;
