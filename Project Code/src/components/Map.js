import React, { Component } from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Polyline
} from "react-google-maps"
import polyline from 'google-polyline'
//import animateTo from 'marker-animate'

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillReceiveProps(){
    console.log('hi')
    console.log(this.props)
  }



  render() {
    clearTimeout();
    clearInterval();
    let locationArray=[
      [26.2502883,78.1735235],
      [ 26.2500766, 78.1695613 ],
      [26.2496472,78.1700595],
      [ 26.246628,78.1731735 ],
      [26.2469349,78.1762078 ],
      [26.2489785,78.1770547],
      [26.2499822,78.1764223]
    ];
  
    let originalArray=[];
  
    locationArray.forEach((ele)=>{
      if(this.props.markersTicked[locationArray.indexOf(ele)])
      originalArray.push(ele);
    });
  
    let markerArray=[];
    originalArray.forEach(stop => {
              
      markerArray.push({lat:stop[0],lng:stop[1]})                               
      })
      this.path=originalArray
  
      let poly=polyline.encode(this.props.polyArray)
       let polyDecoded=polyline.decode(poly);
       let pathLoc=[];
        polyDecoded.forEach(stop => {
              
               pathLoc.push({lat:stop[0],lng:stop[1]})                               
               });     
        const markers=markerArray.map((element)=>{
            return <Marker position={element}></Marker>
        })
        var marker = <Marker position={{lat:0,lng:0}}></Marker>

        // let marker=<Marker />
        console.log(markerArray)

        // var marker = new window.google.maps.Marker({
        //   position: myLatLng,
        //   map: map,
        //   title: 'Hello World!'
        // });

        markers.push(marker)
      

      return (
          <GoogleMap
          id="lol"
            defaultZoom={16}
            center={ { lat:  26.2494532, lng: 78.1717946 } }
            >
                {markers}
                <Polyline
                      path={pathLoc}
                      geodesic={true}
                      options={{
                                      strokeColor: "#ff2527",
                                      strokeOpacity: 0.75,
                                      strokeWeight: 2,
                                      icons: [
                                          {
                                              offset: "0",
                                              repeat: "20px"
                                          }
                                      ]
                                  }}
                              />
          </GoogleMap>
        );
  }
}
// //This Map returns A map with polyline  and markers
// const Map = compose(withGoogleMap((props) =>{
  
//     }
//   ))

  const MapMarker=withScriptjs(withGoogleMap(Map))
  
  export default MapMarker;


