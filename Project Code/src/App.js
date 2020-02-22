import React, { Component } from 'react';
import './App.css';
import MainMap from './components/MainMap'
import {Grid} from '@material-ui/core'
import FormComp from './components/FormComp'

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        checked:[false,false,false,false],
        polyArray:[]
       }
    this.onChangeInMarkers=this.onChangeInMarkers.bind(this);
    this.onChangeInPolyline=this.onChangeInPolyline.bind(this);
    }

    onChangeInMarkers(value){
      console.log(value)
      this.setState({checked:value})
    }

    onChangeInPolyline(value){
      console.log(value)
      this.setState({polyArray:value})
    }

  render() { 
      return ( 
        <div className="App">
      <Grid container>
        <Grid  xs={6} item>
      <MainMap polyArray={this.state.polyArray} markersTicked={this.state.checked}/>
      </Grid>
      <Grid xs={6} item>
        <FormComp onChangeInPolyline={this.onChangeInPolyline} onChangeInMarkers={this.onChangeInMarkers}/>
      </Grid>
      </Grid>
    </div>
       );
  }
}

export default App;
