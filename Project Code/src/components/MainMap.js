import React, { Component } from 'react';
import MapWithAMarker from './Map'

class MainMap extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCDFI7p7SgxdYAxiQGzfX1hz_Yjzvy5hX4"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{height:`100vh`,width:`50vw`}} />}
        mapElement={<div style={{ height: `100%` }} />}
        markersTicked={this.props.markersTicked}
        polyArray={this.props.polyArray}
        startAnimate={false}
      />
         );
    }
}
 
export default MainMap;